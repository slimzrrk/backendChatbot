from langdetect import detect

def split_and_detect_lang(text):
    words = text.split()
    tokens = []

    for word in words:
        try:
            lang = detect(word)
        except:
            lang = "unknown"

        tokens.append({ "word": word, "lang": lang })

    return tokens
