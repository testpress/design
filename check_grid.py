from html.parser import HTMLParser

class DivCounter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.div_depth = 0
        self.log = []

    def handle_starttag(self, tag, attrs):
        if tag == "div":
            self.div_depth += 1
            attr_str = ' '.join([f'{k}="{v}"' for k,v in attrs])
            if "lg:col-span-4" in attr_str or "grid" in attr_str or "lg:col-span-2" in attr_str:
                self.log.append("Line " + str(self.getpos()[0]) + ": <div " + attr_str + "> (depth " + str(self.div_depth) + ")")

    def handle_endtag(self, tag):
        if tag == "div":
            if self.div_depth <= 3:
                self.log.append("Line " + str(self.getpos()[0]) + ": </div> (depth " + str(self.div_depth) + " -> " + str(self.div_depth - 1) + ")")
            self.div_depth -= 1

with open("src/testpress/scaled_score_configuration/add_score.html") as f:
    lines = f.readlines()

content = "".join(lines[192:])

parser = DivCounter()
parser.feed(content)
for l in parser.log:
    print(l)
