import { registerListener } from "../src/js/listeners/auth/register.js"; // Adjust the path
import * as auth from "../src/js/api/auth/index.js";

jest.mock("../src/js/api/auth/index.js");

beforeAll(() => {
    
    Object.defineProperty(window, 'location', {
        configurable: true,
        value: {
            ...window.location,
            reload: jest.fn(), 
        },
    });
});

afterAll(() => {
  
    Object.defineProperty(window, 'location', {
        configurable: true,
        value: {
            ...window.location,
            reload: undefined, 
        },
    });
});

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

    const originalReload = global.location.reload;
    global.location.reload = jest.fn();

    await registerListener(event);

    
    expect(auth.register).toHaveBeenCalledWith(
      "John Doe",
      "johndoe@example.com",
      "password123",
      "https://example.com/avatar.jpg"
    );
    expect(auth.login).toHaveBeenCalledWith(
      "johndoe@example.com",
      "password123"
    );
    expect(global.location.reload).toHaveBeenCalled();
    global.location.reload = originalReload;
  });

  test("should alert if registration fails", async () => {
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    auth.register.mockRejectedValueOnce(new Error("Registration error"));

    const form = document.createElement("form");
    form.innerHTML = `
      <input name="email" value="johndoe@example.com" />
      <input name="name" value="John Doe" />
      <input name="password" value="password123" />
      <input name="avatar" value="https://example.com/avatar.jpg" />
    `;

    const event = { preventDefault: jest.fn(), target: form };

    await registerListener(event);

    expect(mockAlert).toHaveBeenCalledWith(
      "There was a problem creating your account"
    );
    mockAlert.mockRestore(); // Restore original alert
  });

  test("should alert if login fails", async () => {
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    auth.register.mockResolvedValueOnce({});
    auth.login.mockRejectedValueOnce(new Error("Login error"));

    const form = document.createElement("form");
    form.innerHTML = `
      <input name="email" value="johndoe@example.com" />
      <input name="name" value="John Doe" />
      <input name="password" value="password123" />
      <input name="avatar" value="https://example.com/avatar.jpg" />
    `;

    const event = { preventDefault: jest.fn(), target: form };

    await registerListener(event);

    expect(mockAlert).toHaveBeenCalledWith(
      "There was a problem logging into your new account"
    );
    mockAlert.mockRestore(); // Restore original alert
  });
});
