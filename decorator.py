# this is the decorator function
def log_function_call(func):
    def wrapper(*args, **kwargs):
        #print(f"{func.__name__} was called with args {args} and kwargs args {kwargs}")
        print(
            f'function {func.__name__} called with args {args} and kwargs {kwargs}')
        return func(*args, **kwargs)
    return wrapper


@log_function_call
def multiplyBy5(nr):  # this is the decorated function
    return 5 * nr


print(multiplyBy5(12))
# output:
# function multiplyBy5 called with args (12,) and kwargs {}
# 60
