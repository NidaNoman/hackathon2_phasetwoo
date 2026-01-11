import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateTaskForm } from '../CreateTaskForm';
import { api } from '@/lib/api';

// Mock the API module
jest.mock('@/lib/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

describe('CreateTaskForm', () => {
  const mockOnTaskCreated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form elements correctly', () => {
    render(<CreateTaskForm onTaskCreated={mockOnTaskCreated} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create task/i })).toBeInTheDocument();
  });

  it('shows validation error if title is empty on submit', async () => {
    render(<CreateTaskForm onTaskCreated={mockOnTaskCreated} />);
    const submitButton = screen.getByRole('button', { name: /create task/i });

    await userEvent.click(submitButton);

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it('shows validation error if title is too long on input change', async () => {
    render(<CreateTaskForm onTaskCreated={mockOnTaskCreated} />);
    const titleInput = screen.getByLabelText(/title/i);

    const longTitle = 'a'.repeat(256);
    await userEvent.type(titleInput, longTitle);
    fireEvent.blur(titleInput); // Trigger validation

    expect(screen.getByText(/title cannot exceed 255 characters/i)).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it('submits the form successfully with valid data', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({}); // Mock successful API call

    render(<CreateTaskForm onTaskCreated={mockOnTaskCreated} />);
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionTextarea = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /create task/i });

    await userEvent.type(titleInput, 'New Task Title');
    await userEvent.type(descriptionTextarea, 'Task Description');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/api/v1/tasks', { title: 'New Task Title', description: 'Task Description' }, true);
    });
    expect(mockOnTaskCreated).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/task created successfully/i)).toBeInTheDocument();
    expect(titleInput).toHaveValue('');
    expect(descriptionTextarea).toHaveValue('');
  });

  it('shows error message if API call fails', async () => {
    const errorMessage = 'Network Error';
    (api.post as jest.Mock).mockRejectedValueOnce(new Error(errorMessage)); // Mock failed API call

    render(<CreateTaskForm onTaskCreated={mockOnTaskCreated} />);
    const titleInput = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /create task/i });

    await userEvent.type(titleInput, 'Failing Task');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByText(`Failed to create task: ${errorMessage}`)).toBeInTheDocument();
    expect(mockOnTaskCreated).not.toHaveBeenCalled();
  });

  it('disables submit button while loading', async () => {
    (api.post as jest.Mock).mockReturnValueOnce(new Promise(() => {})); // Never resolve to simulate loading

    render(<CreateTaskForm onTaskCreated={mockOnTaskCreated} />);
    const titleInput = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole('button', { name: /create task/i });

    await userEvent.type(titleInput, 'Loading Task');
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByRole('button', { name: /creating.../i })).toBeInTheDocument();
  });
});
