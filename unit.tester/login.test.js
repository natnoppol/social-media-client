import { login } from '../src/js/api/auth/login.js'; // Adjust the path
import { apiPath } from '../src/js/api/constants.js';
import * as storage from '../src/js/storage/index.js'; 

jest.mock("../src/js/storage/index.js")

describe('login', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      fetch.resetMocks(); 
    });

    test('logs in a user successfully and saves profile', async () => {
        const mockResponse = {
          accessToken: 'mockAccessToken',
          name: 'John Doe',
          email: 'johndoe@example.com',
        };
        fetch.mockResponseOnce(JSON.stringify(mockResponse));
        const profile = await login('johndoe@example.com', 'password123');

        expect(fetch).toHaveBeenCalledWith(`${apiPath}auth/login`, {
            method: 'post',
            body: JSON.stringify({
              email: 'johndoe@example.com',
              password: 'password123',
            }),
            headers: expect.any(Object),
          });

          expect(profile).toEqual({ name: 'John Doe', email: 'johndoe@example.com' });
          expect(storage.save).toHaveBeenCalledWith('token', mockResponse.accessToken);
          expect(storage.save).toHaveBeenCalledWith('profile', { name: 'John Doe', email: 'johndoe@example.com' });
        });

        test('throws an error when login fails', async () => {
            fetch.mockRejectOnce(new Error('Internal Server Error'));
        
            await expect(login('johndoe@example.com', 'wrongpassword')).rejects.toThrow('Internal Server Error');
          });
        
          test('throws an error when response is not ok', async () => {
            fetch.mockResponseOnce('', { status: 401 });
        
            await expect(login('johndoe@example.com', 'password123')).rejects.toThrow('Unauthorized');
          });
        });

