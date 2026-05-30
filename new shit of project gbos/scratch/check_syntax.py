import sys

def check_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple bracket counting
    braces = 0
    brackets = 0
    in_single_quote = False
    in_double_quote = False
    in_backtick = False
    
    for i, char in enumerate(content):
        if char == "'" and not (in_double_quote or in_backtick) and (i == 0 or content[i-1] != '\\'):
            in_single_quote = not in_single_quote
        elif char == '"' and not (in_single_quote or in_backtick) and (i == 0 or content[i-1] != '\\'):
            in_double_quote = not in_double_quote
        elif char == '`' and not (in_single_quote or in_double_quote) and (i == 0 or content[i-1] != '\\'):
            in_backtick = not in_backtick
            
        if not (in_single_quote or in_double_quote or in_backtick):
            if char == '{':
                braces += 1
            elif char == '}':
                braces -= 1
            elif char == '[':
                brackets += 1
            elif char == ']':
                brackets -= 1
                
    print(f"Braces balance: {braces}")
    print(f"Brackets balance: {brackets}")
    print(f"Single quote open: {in_single_quote}")
    print(f"Double quote open: {in_double_quote}")
    print(f"Backtick open: {in_backtick}")

if __name__ == "__main__":
    check_file(sys.argv[1])
