import { register } from "../src/js/api/auth/register.js";
import { apiPath } from "../src/js/api/constants.js";
import { headers } from "../src/js/api/headers.js";

describe("register", () => {
  beforeEach(() => {
    fetch.resetMocks(); // Reset fetch mocks before each test
  });

  test("registers a user successfully", async () => {
    const mockResponse = {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      avatar: "https://example.com/avatar.jpg",
    };

    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const result = await register(
      "John Doe",
      "johndoe@example.com",
      "password123",
      "https://example.com/avatar.jpg"
    );

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/auth/register`, {
      method: "post",
      body: JSON.stringify({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
        avatar: "https://example.com/avatar.jpg",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(result).toEqual(mockResponse);
  });

  test("throws an error when registration fails", async () => {
    fetch.mockRejectOnce(new Error("Internal Server Error"));

    await expect(
      register(
        "John Doe",
        "johndoe@example.com",
        "password123",
        "https://example.com/avatar.jpg"
      )
    ).rejects.toThrow("Internal Server Error");
  });
});
