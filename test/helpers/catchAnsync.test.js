const catchAsync = require("../../helpers/catchAnsync");

describe("catchAsync", () => {
  it("should call the provided function and catch any errors", async () => {
    const mockFn = jest.fn().mockResolvedValue("Success");
    const mockReq = {};
    const mockRes = {};
    const mockNext = jest.fn();

    await catchAsync(mockFn)(mockReq, mockRes, mockNext);

    expect(mockFn).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should call the next middleware with an error if an error occurs", async () => {
    const mockFn = jest.fn().mockRejectedValue(new Error("Async error"));
    const mockReq = {};
    const mockRes = {};
    const mockNext = jest.fn();

    await catchAsync(mockFn)(mockReq, mockRes, mockNext);

    expect(mockFn).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledWith(new Error("Async error"));
  });
});
