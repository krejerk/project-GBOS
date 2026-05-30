import sys

def check_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    braces = 0
    brackets = 0
    in_single_quote = False
    in_double_quote = False
    in_backtick = False
    
    line_no = 1
    for i, char in enumerate(content):
        if char == '\n':
            line_no += 1
            
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
                if braces < 0:
                    print(f"Braces went negative at line {line_no}")
                    # Reset to look for more
                    braces = 0
            elif char == '[':
                brackets += 1
            elif char == ']':
                brackets -= 1
                if brackets < 0:
                    print(f"Brackets went negative at line {line_no}")
                    brackets = 0
                
    print(f"Final Braces balance: {braces}")
    print(f"Final Brackets balance: {brackets}")

if __name__ == "__main__":
    check_file(sys.argv[1])
