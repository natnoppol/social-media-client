import { registerListener } from "../src/js/listeners/auth/register.js"; // Adjust the path
import * as auth from "../src/js/api/auth/index.js";

jest.mock("../src/js/api/auth/index.js");

describe("registerListener", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
  });

test("should register and login successfully", async () => {
  auth.register.mockResolvedValueOnce({});
  auth.login.mockResolvedValueOnce({});

  const form = document.createElement("form");
  form.innerHTML = `
     <input name="email" value="johndoe@example.com" />
      <input name="name" value="John Doe" />
      <input name="password" value="password123" />
      <input name="avatar" value="https://example.com/avatar.jpg" />
    `;

    const event = { preventDefault: jest.fn(), target: form };

    await registerListener(event)

    expect(auth.register).toHaveBeenCalledWith('John Doe', 'johndoe@example.com', 'password123', 'https://example.com/avatar.jpg');
    expect(auth.login).toHaveBeenCalledWith('johndoe@example.com', 'password123');
});

test('should alert if registration fails', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    auth.register.mockRejectedValueOnce(new Error('Registration error'));

    const form = document.createElement('form');
    form.innerHTML = `
      <input name="email" value="johndoe@example.com" />
      <input name="name" value="John Doe" />
      <input name="password" value="password123" />
      <input name="avatar" value="https://example.com/avatar.jpg" />
    `;
    
    const event = { preventDefault: jest.fn(), target: form };

    await registerListener(event);

    expect(mockAlert).toHaveBeenCalledWith('There was a problem creating your account');
    mockAlert.mockRestore(); // Restore original alert
  });

  test('should alert if login fails', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    auth.register.mockResolvedValueOnce({});
    auth.login.mockRejectedValueOnce(new Error('Login error'));

    const form = document.createElement('form');
    form.innerHTML = `
      <input name="email" value="johndoe@example.com" />
      <input name="name" value="John Doe" />
      <input name="password" value="password123" />
      <input name="avatar" value="https://example.com/avatar.jpg" />
    `;
    
    const event = { preventDefault: jest.fn(), target: form };

    await registerListener(event);

    expect(mockAlert).toHaveBeenCalledWith('There was a problem logging into your new account');
    mockAlert.mockRestore(); // Restore original alert
  });
});