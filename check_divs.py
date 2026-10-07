from html.parser import HTMLParser

class DivCounter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.div_depth = 0
        self.log = []

    def handle_starttag(self, tag, attrs):
        if tag == "div":
            self.div_depth += 1
            self.log.append("Line " + str(self.getpos()[0]) + ": <div ...> (depth " + str(self.div_depth) + ")")

    def handle_endtag(self, tag):
        if tag == "div":
            self.log.append("Line " + str(self.getpos()[0]) + ": </div> (depth " + str(self.div_depth) + " -> " + str(self.div_depth - 1) + ")")
            self.div_depth -= 1

with open("src/testpress/scaled_score_configuration/add_score.html") as f:
    lines = f.readlines()

card_content = "".join(lines[196:485])

parser = DivCounter()
parser.feed(card_content)
for l in parser.log:
    print(l)
print("Final div depth: " + str(parser.div_depth))
