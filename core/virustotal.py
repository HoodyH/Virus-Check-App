
def check_on_virustotal(target: str) -> dict:
    return {
        "harmless": 11,
        "malicious": 1,
        "suspicious": 0,
        "timeout": 0,
        "undetected": 1
    }
