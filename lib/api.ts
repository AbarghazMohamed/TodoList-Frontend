/**
 * API Service
 *
 * This file centralizes all API calls to the backend server.
 * It provides a clean interface for CRUD operations on todos.
 */
import axios from 'axios'

// Base URL for the API
const API_BASE_URL = 'http://localhost:3001'

// Todo interface definition
export interface Todo {
  id?: number
  title: string
  description: string
  completed: boolean
}

/**
 * TodoAPI class provides methods for interacting with the todo API
 */
class TodoAPI {
  /**
   * Fetches all todos from the API
   * @returns Promise containing an array of Todo objects
   */

  async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`)
      return response.data
    } catch (error) {
      console.error('Error fetching todos:', error)
      throw error
    }
  }

  /**
   * Fetches a single todo by ID
   * @param id - The ID of the todo to fetch
   * @returns Promise containing a Todo object
   */
  async getTodoById(id: number): Promise<Todo> {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching todo with id ${id}:`, error)
      throw error
    }
  }

  /**
   * Creates a new todo
   * @param todo - The todo object to create (without ID)
   * @returns Promise containing the created Todo object with ID
   */
  async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, todo)
      return response.data
    } catch (error) {
      console.error('Error creating todo:', error)
      throw error
    }
  }

  /**
   * Updates an existing todo
   * @param id - The ID of the todo to update
   * @param todo - The updated todo object
   * @returns Promise containing the updated Todo object
   */
  async updateTodo(id: number, todo: Todo): Promise<Todo> {
    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, todo)
      return response.data
    } catch (error) {
      console.error(`Error updating todo with id ${id}:`, error)
      throw error
    }
  }

  /**
   * Toggles the completed status of a todo
   * @param id - The ID of the todo to toggle
   * @param completed - The new completed status
   * @returns Promise containing the updated Todo object
   */
  async toggleTodoStatus(id: number, completed: boolean): Promise<Todo> {
    try {
      const todo = await this.getTodoById(id)
      return this.updateTodo(id, { ...todo, completed })
    } catch (error) {
      console.error(`Error toggling todo status with id ${id}:`, error)
      throw error
    }
  }

  /**
   * Deletes a todo by ID
   * @param id - The ID of the todo to delete
   * @returns Promise that resolves when the todo is deleted
   */
  async deleteTodo(id: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`)
    } catch (error) {
      console.error(`Error deleting todo with id ${id}:`, error)
      throw error
    }
  }
}

// Export a singleton instance of the API
export const todoApi = new TodoAPI()
