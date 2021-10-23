txt = 'asdf;lkajsdf,as;lfkja'

for i in txt:
    txt = txt[1:]
    if i == ",":
        break


print(txt)