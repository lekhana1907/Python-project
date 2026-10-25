import type { KbEntry } from "./knowledge-base";

/** Expansion pack: frequent error messages, files and OS, numbers, OOP depth, tooling and libraries. */
export const expandedKnowledge: KbEntry[] = [
  // ---------- Error messages students paste ----------
  {
    id: "error-concat-str-int",
    topic: "Common errors",
    questions: [
      "TypeError: can only concatenate str (not int) to str",
      "How do I add a number to a string?",
      "Why can't I join a string and an integer?",
    ],
    keywords: ["concatenate", "str", "int", "typeerror", "combine", "number", "string"],
    answer:
      "Python won't silently mix text and numbers. Convert the number with str(), or better, use an f-string, which converts for you. Going the other way, turn text into a number with int() or float() before doing maths.",
    code: 'age = 21\n# "Age: " + age            # TypeError\n"Age: " + str(age)        # "Age: 21"\nf"Age: {age}"             # "Age: 21"\nint("5") + 1              # 6',
  },
  {
    id: "error-nonetype-subscriptable",
    topic: "Common errors",
    questions: [
      "TypeError: 'NoneType' object is not subscriptable",
      "TypeError: 'NoneType' object is not iterable",
      "Why is my variable None?",
    ],
    keywords: ["nonetype", "subscriptable", "iterable", "none", "return", "typeerror"],
    answer:
      "Something you expected to be a list or dict is actually None. Usually a function forgot to return a value (functions return None by default), or you saved the result of an in-place method like list.sort() or list.append(). Print the variable just before the error and check every return path.",
    code: "def load():\n    data = [1, 2, 3]\n    # forgot: return data\n\nitems = load()     # None\n# items[0]         # TypeError: 'NoneType' object is not subscriptable\n\ndef load():\n    return [1, 2, 3]",
  },
  {
    id: "error-str-item-assignment",
    topic: "Common errors",
    questions: [
      "TypeError: 'str' object does not support item assignment",
      "How do I change one character in a string?",
      "Why can't I modify a string?",
    ],
    keywords: ["str", "item assignment", "immutable", "character", "change", "modify"],
    answer:
      "Strings are immutable, so you can't change a character in place. Build a new string instead: slice around the position, use replace(), or convert to a list, edit it, and join it back.",
    code: 'word = "cat"\n# word[0] = "b"            # TypeError\nword = "b" + word[1:]     # "bat"\nword.replace("a", "u")    # "but"\nchars = list(word); chars[2] = "g"; "".join(chars)  # "bag"',
  },
  {
    id: "error-dict-changed-size",
    topic: "Common errors",
    questions: [
      "RuntimeError: dictionary changed size during iteration",
      "How do I remove items from a list while looping?",
      "Why does deleting inside a for loop skip items?",
    ],
    keywords: ["runtimeerror", "changed size", "iteration", "delete", "remove", "while looping"],
    answer:
      "Changing a dict or list while you loop over it confuses the iterator. Loop over a copy (list(d), items[:]) or, better, build a new collection with a comprehension that keeps only what you want.",
    code: 'scores = {"ann": 40, "bob": 90, "cy": 55}\nfor name in list(scores):        # loop over a copy of the keys\n    if scores[name] < 50:\n        del scores[name]\n\nnums = [1, 2, 3, 4]\nnums = [n for n in nums if n % 2 == 0]   # [2, 4]',
  },
  {
    id: "error-file-not-found",
    topic: "Common errors",
    questions: [
      "FileNotFoundError: No such file or directory",
      "Why can't Python find my file?",
      "How do I open a file in the same folder as my script?",
    ],
    keywords: [
      "filenotfounderror",
      "no such file",
      "path",
      "directory",
      "working directory",
      "__file__",
    ],
    answer:
      "Relative paths are resolved from the current working directory, which is wherever you ran Python from, not where the script lives. Build paths from the script's own location with pathlib, and check the spelling and extension (Windows often hides .txt).",
    code: 'from pathlib import Path\n\nhere = Path(__file__).parent\ndata_file = here / "data.txt"\nprint(data_file.exists())\ntext = data_file.read_text(encoding="utf-8")',
  },
  {
    id: "error-circular-import",
    topic: "Common errors",
    questions: [
      "What is a circular import?",
      "ImportError: cannot import name (most likely due to a circular import)",
      "How do I fix partially initialized module errors?",
    ],
    keywords: ["circular import", "importerror", "cannot import name", "partially initialized"],
    answer:
      "Two modules import each other, so one of them is used before it finishes loading. Move the shared code into a third module both can import, import inside the function that needs it, or import the module (import b) instead of a name from it (from b import x). Also check you haven't named your file like the library you're importing.",
    code: "# models.py and utils.py import each other -> move shared helpers out\n# common.py\ndef slugify(text): ...\n\n# models.py\nfrom common import slugify\n\n# utils.py\nfrom common import slugify",
  },
  {
    id: "debugger-pdb",
    topic: "Testing and debugging",
    questions: [
      "How do I use a debugger in Python?",
      "What does breakpoint() do?",
      "How do I step through my code?",
    ],
    keywords: ["debugger", "pdb", "breakpoint", "step", "inspect", "debug"],
    answer:
      "Put breakpoint() where you want to pause. Python drops you into pdb: type n to run the next line, s to step into a call, p name to print a variable, c to continue and q to quit. Editors like VS Code and PyCharm give you the same with clickable breakpoints.",
    code: "def average(nums):\n    total = sum(nums)\n    breakpoint()          # pauses here: try `p total`, `n`, `c`\n    return total / len(nums)",
  },
  // ---------- Input and output ----------
  {
    id: "input-multiple-numbers",
    topic: "Input and output",
    questions: [
      "How do I read multiple numbers from one input line?",
      "How do I take a list of numbers as input?",
      "How do I split input into integers?",
    ],
    keywords: ["input", "split", "map", "int", "multiple", "numbers", "list"],
    answer:
      "Read the line, split() it on spaces, and convert each piece with int (or float). map() or a list comprehension both work; unpacking gives you named variables when you know how many values to expect.",
    code: 'a, b = map(int, input("Two numbers: ").split())\nnums = [int(x) for x in input("Numbers: ").split()]\nprint(sum(nums))',
  },
  {
    id: "print-end-sep",
    topic: "Input and output",
    questions: [
      "How do I print without a new line?",
      "What do sep and end do in print?",
      "How do I print on the same line?",
    ],
    keywords: ["print", "end", "sep", "newline", "same line", "flush"],
    answer:
      "print() adds a newline after its output; change that with end=. Items are separated by a space; change that with sep=. Add flush=True when you need text to appear immediately, for example in progress output.",
    code: 'for i in range(3):\n    print(i, end=" ")       # 0 1 2\nprint()\nprint("2026", "10", "25", sep="-")   # 2026-10-25\nprint("Loading...", end="\\r", flush=True)',
  },
  {
    id: "string-format-methods",
    topic: "Strings",
    questions: [
      "What is the difference between f-strings, format() and %?",
      "How does str.format work?",
      "What is % string formatting?",
    ],
    keywords: ["format", "%", "percent", "str.format", "placeholder", "old style"],
    answer:
      "All three insert values into text. f-strings (Python 3.6+) are the clearest and fastest, so prefer them. str.format() is useful when the template is stored separately from the values. The % style is the oldest; you'll still see it in older code and in the logging module.",
    code: 'name, n = "Ada", 3\nf"{name} has {n} cats"\n"{} has {} cats".format(name, n)\n"{who} has {count} cats".format(who=name, count=n)\n"%s has %d cats" % (name, n)',
  },
  // ---------- Collections ----------
  {
    id: "matrix-2d-list",
    topic: "Lists",
    questions: [
      "How do I create a 2D list?",
      "Why does changing one row change all rows?",
      "How do I make a matrix in Python?",
      "How do I transpose a matrix?",
    ],
    keywords: ["2d", "matrix", "grid", "nested list", "rows", "columns", "transpose"],
    answer:
      "Build each row separately with a comprehension. [[0] * 3] * 3 looks right but repeats the same inner list three times, so editing one row edits them all. zip(*matrix) transposes rows and columns.",
    code: "grid = [[0] * 3 for _ in range(3)]   # 3 independent rows\ngrid[0][1] = 5\n\nbad = [[0] * 3] * 3                  # same row repeated!\nbad[0][1] = 5                        # changes every row\n\nm = [[1, 2], [3, 4]]\n[list(r) for r in zip(*m)]           # [[1, 3], [2, 4]]",
  },
  {
    id: "sort-multiple-keys",
    topic: "Sorting",
    questions: [
      "How do I sort by multiple keys?",
      "How do I sort a list of tuples by the second element?",
      "How do I sort objects by an attribute?",
    ],
    keywords: ["sort", "key", "multiple", "tuple", "attrgetter", "itemgetter", "second element"],
    answer:
      "Give sorted() a key function that returns a tuple: Python compares the first item, then the second to break ties. Negate a number to flip its direction, or use operator.itemgetter and attrgetter for readable keys.",
    code: 'people = [("ann", 30), ("bob", 25), ("cy", 30)]\nsorted(people, key=lambda p: p[1])           # by age\nsorted(people, key=lambda p: (-p[1], p[0]))  # age desc, then name\n\nfrom operator import itemgetter\nsorted(people, key=itemgetter(1, 0))',
  },
  {
    id: "heapq-priority-queue",
    topic: "Data structures",
    questions: [
      "What is heapq?",
      "How do I make a priority queue in Python?",
      "How do I get the n smallest or largest items?",
    ],
    keywords: ["heapq", "heap", "priority queue", "nsmallest", "nlargest", "min heap"],
    answer:
      "heapq turns a plain list into a min-heap: heappush adds an item and heappop always removes the smallest, both in O(log n). Push (priority, item) tuples for a priority queue. nlargest and nsmallest grab the top items without sorting everything.",
    code: 'import heapq\n\ntasks = []\nheapq.heappush(tasks, (2, "write report"))\nheapq.heappush(tasks, (1, "fix bug"))\nheapq.heappop(tasks)            # (1, "fix bug")\n\nheapq.nlargest(3, [5, 1, 9, 7, 3])   # [9, 7, 5]',
  },
  {
    id: "frozenset-hashable",
    topic: "Sets",
    questions: [
      "What is a frozenset?",
      "What does hashable mean?",
      "Why can't I put a list in a set?",
    ],
    keywords: ["frozenset", "hashable", "unhashable", "set", "dict key", "typeerror"],
    answer:
      "Set members and dict keys must be hashable, meaning their value can't change. Numbers, strings, tuples and frozensets are hashable; lists, dicts and sets are not, so putting a list in a set raises TypeError: unhashable type. Convert to a tuple or frozenset first.",
    code: "seen = set()\n# seen.add([1, 2])          # TypeError: unhashable type: 'list'\nseen.add((1, 2))             # tuples are fine\nfs = frozenset({1, 2})\nlookup = {fs: \"pair\"}",
  },
  // ---------- Numbers ----------
  {
    id: "number-bases",
    topic: "Numbers",
    questions: [
      "How do I convert a number to binary?",
      "How do I convert binary or hex to decimal?",
      "How do I convert decimal to hexadecimal?",
    ],
    keywords: ["binary", "hex", "hexadecimal", "octal", "bin", "base", "convert"],
    answer:
      "bin(), oct() and hex() turn an int into text in base 2, 8 or 16. int(text, base) goes back the other way. Format specs like :b and :08b give you the digits without the 0b prefix, padded to a width.",
    code: 'bin(10)            # "0b1010"\nhex(255)           # "0xff"\nint("1010", 2)     # 10\nint("ff", 16)      # 255\nf"{10:08b}"        # "00001010"',
  },
  {
    id: "ord-chr",
    topic: "Strings",
    questions: [
      "How do I get the ASCII value of a character?",
      "What do ord and chr do?",
      "How do I convert a character to a number?",
    ],
    keywords: ["ascii", "ord", "chr", "unicode", "character code", "code point"],
    answer:
      "ord() returns the Unicode code point of a single character, which matches ASCII for basic English letters. chr() converts a code point back into a character. They're handy for simple ciphers and letter arithmetic.",
    code: 'ord("A")          # 65\nchr(97)           # "a"\n# shift a letter by 3 (Caesar cipher)\nchr((ord("x") - ord("a") + 3) % 26 + ord("a"))   # "a"',
  },
  {
    id: "bitwise-operators",
    topic: "Operators",
    questions: [
      "What are bitwise operators in Python?",
      "What do & | ^ ~ << >> do?",
      "How do I check if a bit is set?",
    ],
    keywords: ["bitwise", "and", "or", "xor", "shift", "bits", "mask"],
    answer:
      "Bitwise operators work on the binary digits of integers: & (and), | (or), ^ (xor), ~ (invert), << and >> (shift left and right). Shifting left by n multiplies by 2**n. Use a mask with & to test whether a bit is set.",
    code: "a, b = 0b1100, 0b1010\na & b     # 0b1000 = 8\na | b     # 0b1110 = 14\na ^ b     # 0b0110 = 6\n1 << 4    # 16\nflags = 0b101\nbool(flags & 0b100)   # True: bit 2 is set",
  },
  {
    id: "inf-nan-bigint",
    topic: "Numbers",
    questions: [
      "How big can integers be in Python?",
      "How do I represent infinity in Python?",
      "What is NaN and how do I check for it?",
    ],
    keywords: ["infinity", "inf", "nan", "big integer", "overflow", "isnan", "max int"],
    answer:
      "Python ints have no fixed size: they grow as large as your memory allows, so they never overflow. Floats are 64-bit and include special values: float('inf') for infinity and float('nan') for not-a-number. NaN is not equal to itself, so test it with math.isnan().",
    code: 'import math\n2 ** 200                 # exact, no overflow\nbest = float("inf")\nmin(best, 42)            # 42\nx = float("nan")\nx == x                   # False!\nmath.isnan(x)            # True',
  },
  {
    id: "random-module",
    topic: "Standard library",
    questions: [
      "How do I pick a random item from a list?",
      "How do I shuffle a list?",
      "How do I generate a random number in a range?",
    ],
    keywords: ["random", "choice", "shuffle", "randint", "sample", "uniform", "seed"],
    answer:
      "random.randint(a, b) gives an int from a to b inclusive, random.random() a float in [0, 1), choice() picks one item, sample() picks several without repeats, and shuffle() reorders a list in place. Call random.seed() for repeatable results. Use the secrets module, not random, for passwords and tokens.",
    code: 'import random\nrandom.randint(1, 6)\nrandom.choice(["rock", "paper", "scissors"])\nrandom.sample(range(1, 50), 6)\ndeck = list(range(10)); random.shuffle(deck)\n\nimport secrets\nsecrets.token_hex(16)    # safe random token',
  },
  // ---------- Files and the OS ----------
  {
    id: "find-files",
    topic: "File handling",
    questions: [
      "How do I find all files with an extension?",
      "How do I loop through files in a folder and subfolders?",
      "What is glob?",
      "How does os.walk work?",
    ],
    keywords: [
      "glob",
      "rglob",
      "os.walk",
      "files",
      "folder",
      "extension",
      "recursive",
      "directory",
    ],
    answer:
      "pathlib's glob('*.txt') matches files in one folder and rglob('*.txt') searches every subfolder too. os.walk() is the older way: it yields each folder with its subfolders and files.",
    code: 'from pathlib import Path\n\nfor p in Path("photos").rglob("*.jpg"):\n    print(p.name, p.stat().st_size)\n\nimport os\nfor folder, subfolders, files in os.walk("."):\n    print(folder, len(files))',
  },
  {
    id: "copy-move-delete-files",
    topic: "File handling",
    questions: [
      "How do I copy or move a file?",
      "How do I delete a file or folder?",
      "How do I create a folder?",
    ],
    keywords: ["shutil", "copy", "move", "delete", "remove", "mkdir", "rmtree", "folder"],
    answer:
      "shutil.copy2() copies a file with its metadata and shutil.move() moves or renames. Path.unlink() deletes a file, Path.mkdir(parents=True, exist_ok=True) creates folders safely, and shutil.rmtree() deletes a whole folder tree, permanently, so double-check the path first.",
    code: 'import shutil\nfrom pathlib import Path\n\nPath("backup/2026").mkdir(parents=True, exist_ok=True)\nshutil.copy2("report.pdf", "backup/2026/")\nshutil.move("draft.txt", "archive/draft.txt")\nPath("old.log").unlink(missing_ok=True)',
  },
  {
    id: "subprocess-run",
    topic: "Standard library",
    questions: [
      "How do I run a shell command from Python?",
      "What is subprocess?",
      "How do I get the output of a command?",
    ],
    keywords: ["subprocess", "shell", "command", "run", "terminal", "os.system", "output"],
    answer:
      "Use subprocess.run() with the command as a list of arguments. capture_output=True and text=True give you stdout as a string, and check=True raises an error if the command fails. Avoid shell=True with user input: it opens the door to command injection.",
    code: 'import subprocess\n\nresult = subprocess.run(\n    ["git", "status", "--short"],\n    capture_output=True, text=True, check=True,\n)\nprint(result.stdout)',
  },
  {
    id: "hashing-uuid",
    topic: "Standard library",
    questions: [
      "How do I hash a string in Python?",
      "How do I generate a unique ID?",
      "How do I store passwords safely in Python?",
    ],
    keywords: ["hashlib", "sha256", "md5", "uuid", "unique id", "hash", "password"],
    answer:
      "hashlib gives you fingerprints like SHA-256 of bytes (encode the string first). uuid.uuid4() creates a random unique ID. For passwords, never store a plain hash: use a slow, salted algorithm such as hashlib.scrypt or a library like bcrypt or argon2.",
    code: 'import hashlib, uuid\n\nhashlib.sha256("hello".encode()).hexdigest()\nstr(uuid.uuid4())        # e.g. "9f1c...-..."\n\nimport os\nsalt = os.urandom(16)\nkey = hashlib.scrypt(b"s3cret", salt=salt, n=2**14, r=8, p=1)',
  },
  {
    id: "excel-files",
    topic: "Working with data",
    questions: [
      "How do I read an Excel file in Python?",
      "How do I write data to Excel?",
      "What is openpyxl?",
    ],
    keywords: ["excel", "xlsx", "openpyxl", "spreadsheet", "read_excel", "to_excel"],
    answer:
      "With pandas, read_excel() loads a sheet into a DataFrame and to_excel() writes one back; both use openpyxl for .xlsx files (pip install pandas openpyxl). Use openpyxl directly when you need cell-level control like formatting or formulas.",
    code: 'import pandas as pd\n\ndf = pd.read_excel("sales.xlsx", sheet_name="2026")\nsummary = df.groupby("region")["amount"].sum()\nsummary.to_excel("summary.xlsx")',
  },
  // ---------- OOP depth ----------
  {
    id: "class-vs-instance-vars",
    topic: "OOP basics",
    questions: [
      "What is the difference between class variables and instance variables?",
      "Why is my list shared between all objects?",
      "What is a class attribute?",
    ],
    keywords: ["class variable", "instance variable", "attribute", "shared", "self"],
    answer:
      "Instance variables are set on self (usually in __init__) and belong to one object. Class variables are written in the class body and are shared by every instance. A mutable class variable like a list is shared too, which surprises people, so create per-object lists in __init__.",
    code: 'class Dog:\n    species = "canine"          # shared by all dogs\n    def __init__(self, name):\n        self.name = name         # unique per dog\n        self.tricks = []         # per-dog list (not a class variable!)\n\na, b = Dog("Rex"), Dog("Fido")\na.tricks.append("sit")\nb.tricks                         # []',
  },
  {
    id: "operator-overloading",
    topic: "OOP basics",
    questions: [
      "How do I overload operators in Python?",
      "How do I make + work with my own class?",
      "What are __add__ and __eq__?",
    ],
    keywords: ["operator overloading", "__add__", "__eq__", "__lt__", "dunder", "magic method"],
    answer:
      "Define special methods on your class and Python calls them for operators: __add__ for +, __eq__ for ==, __lt__ for <, __len__ for len(), __str__ for print(). Return NotImplemented when the other value isn't a type you support.",
    code: 'class Vec:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        if not isinstance(other, Vec):\n            return NotImplemented\n        return Vec(self.x + other.x, self.y + other.y)\n    def __eq__(self, other):\n        return isinstance(other, Vec) and (self.x, self.y) == (other.x, other.y)\n    def __repr__(self):\n        return f"Vec({self.x}, {self.y})"\n\nVec(1, 2) + Vec(3, 4)   # Vec(4, 6)',
  },
  {
    id: "str-vs-repr",
    topic: "OOP basics",
    questions: [
      "What is the difference between __str__ and __repr__?",
      "How do I control how my object prints?",
    ],
    keywords: ["__str__", "__repr__", "print object", "representation", "string"],
    answer:
      "__repr__ is the unambiguous, developer-facing form shown in the REPL, in lists and in debuggers; ideally it looks like code that rebuilds the object. __str__ is the friendly form used by print() and str(). If you only write one, write __repr__: Python falls back to it for str().",
    code: 'class Money:\n    def __init__(self, cents):\n        self.cents = cents\n    def __repr__(self):\n        return f"Money({self.cents})"\n    def __str__(self):\n        return f"${self.cents / 100:.2f}"\n\nm = Money(1999)\nprint(m)     # $19.99\n[m]          # [Money(1999)]',
  },
  {
    id: "slots-metaclass",
    topic: "OOP basics",
    questions: [
      "What is __slots__?",
      "What is a metaclass in Python?",
      "How do I save memory with many objects?",
    ],
    keywords: ["__slots__", "metaclass", "memory", "type", "advanced oop"],
    answer:
      "__slots__ lists an object's allowed attributes, which removes the per-instance __dict__: objects get smaller and faster, but you can't add new attributes. A metaclass is the class of a class (type by default) and customises how classes are created; it's rarely needed — decorators and __init_subclass__ cover most cases.",
    code: "class Point:\n    __slots__ = (\"x\", \"y\")\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\np = Point(1, 2)\n# p.z = 3        # AttributeError: no slot for 'z'\ntype(Point)      # <class 'type'> — the default metaclass",
  },
  {
    id: "memory-garbage-collection",
    topic: "Performance",
    questions: [
      "How does memory management work in Python?",
      "What is garbage collection in Python?",
      "What does id() return?",
    ],
    keywords: ["memory", "garbage collection", "reference counting", "gc", "id", "del"],
    answer:
      "Variables are names pointing at objects. CPython counts references to each object and frees it as soon as the count drops to zero; a cycle-detecting garbage collector cleans up objects that only reference each other. id() returns an object's identity (its memory address in CPython). del removes a name, not the object itself.",
    code: "import sys, gc\n\na = [1, 2, 3]\nb = a                       # two names, one object\nid(a) == id(b)              # True\nsys.getrefcount(a)          # 3 (a, b, and the call argument)\ndel a                       # b still keeps the list alive\ngc.collect()                # run the cycle collector now",
  },
  // ---------- Tooling ----------
  {
    id: "requirements-txt",
    topic: "Environments and packaging",
    questions: [
      "What is requirements.txt?",
      "What is a requirements file?",
      "How do I share my project's dependencies?",
      "What does pip freeze do?",
    ],
    keywords: ["requirements.txt", "pip freeze", "dependencies", "install -r", "pyproject"],
    answer:
      "requirements.txt lists the packages (and ideally versions) your project needs. Create it with pip freeze > requirements.txt from inside your virtual environment, and anyone can recreate the setup with pip install -r requirements.txt. Newer projects often declare dependencies in pyproject.toml instead.",
    code: "python -m venv .venv\n.venv\\Scripts\\activate          # macOS/Linux: source .venv/bin/activate\npip install requests pandas\npip freeze > requirements.txt\n\n# on another machine\npip install -r requirements.txt",
  },
  {
    id: "pip-vs-conda",
    topic: "Environments and packaging",
    questions: ["What is the difference between pip and conda?", "Should I use Anaconda?"],
    keywords: ["conda", "anaconda", "pip", "miniconda", "package manager", "environment"],
    answer:
      "pip installs Python packages from PyPI into the current environment. conda (from Anaconda or Miniconda) manages whole environments, including non-Python libraries and the Python version itself, which is handy for data science on Windows. Either works; pick one per project and avoid mixing them in the same environment.",
    code: "# pip + venv\npython -m venv .venv\npip install numpy\n\n# conda\nconda create -n ds python=3.12 numpy pandas\nconda activate ds",
  },
  {
    id: "jupyter",
    topic: "Python ecosystem",
    questions: [
      "What is Jupyter Notebook?",
      "How do I start Jupyter?",
      "Notebook vs script, which should I use?",
    ],
    keywords: ["jupyter", "notebook", "ipynb", "jupyterlab", "colab", "cells"],
    answer:
      "Jupyter lets you run Python in cells and see results, tables and charts right below the code, which is perfect for exploring data and learning. Install it with pip install jupyterlab and run jupyter lab. Move finished logic into .py files so it can be tested and reused. Google Colab gives you a free notebook in the browser.",
    code: 'pip install jupyterlab\njupyter lab          # opens in your browser\n\n# inside a cell\nimport pandas as pd\npd.read_csv("data.csv").describe()',
  },
  {
    id: "zen-of-python",
    topic: "Style and best practices",
    questions: [
      "What is the Zen of Python?",
      "What does import this do?",
      "What does Pythonic mean?",
    ],
    keywords: ["zen", "import this", "pythonic", "philosophy", "readability"],
    answer:
      'Run import this to print the Zen of Python, 19 short principles such as "Readability counts" and "There should be one obvious way to do it". Code is called Pythonic when it uses the language\'s idioms — comprehensions, unpacking, with blocks, iterating directly — instead of translating habits from other languages.',
    code: "import this\n\n# un-Pythonic\nfor i in range(len(names)):\n    print(names[i])\n\n# Pythonic\nfor name in names:\n    print(name)",
  },
  // ---------- Libraries for projects ----------
  {
    id: "scikit-learn-basics",
    topic: "Data science",
    questions: [
      "How do I start machine learning in Python?",
      "What is scikit-learn?",
      "How do I train a simple model?",
    ],
    keywords: ["machine learning", "scikit-learn", "sklearn", "model", "train", "predict", "fit"],
    answer:
      "scikit-learn is the standard library for classic machine learning. Every model follows the same pattern: split your data, fit() on the training part, predict() on the test part, and measure accuracy. Start with simple models like LogisticRegression or RandomForest before deep learning.",
    code: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = RandomForestClassifier().fit(X_train, y_train)\nmodel.score(X_test, y_test)     # accuracy, e.g. 0.97",
  },
  {
    id: "tkinter-gui",
    topic: "GUI and games",
    questions: [
      "How do I make a GUI in Python?",
      "What is tkinter?",
      "How do I create a window with a button?",
    ],
    keywords: ["gui", "tkinter", "window", "button", "desktop app", "interface"],
    answer:
      "tkinter ships with Python and is the quickest way to build a desktop window: create a Tk root, add widgets like Label, Entry and Button, and start the event loop with mainloop(). For a more modern look try customtkinter, or PyQt/PySide for larger apps.",
    code: 'import tkinter as tk\n\nroot = tk.Tk()\nroot.title("Greeter")\nname = tk.Entry(root)\nname.pack(padx=10, pady=5)\nout = tk.Label(root, text="")\nout.pack()\ntk.Button(root, text="Say hi", command=lambda: out.config(text=f"Hi {name.get()}!")).pack(pady=5)\nroot.mainloop()',
  },
  {
    id: "pygame-games",
    topic: "GUI and games",
    questions: ["How do I make a game in Python?", "What is pygame?"],
    keywords: ["game", "pygame", "game loop", "sprite", "arcade"],
    answer:
      "pygame is the classic library for 2D games. Every game runs a loop: handle events (keys, quit), update positions, draw, then flip the display, about 60 times a second using a Clock. Install it with pip install pygame.",
    code: "import pygame\n\npygame.init()\nscreen = pygame.display.set_mode((640, 480))\nclock = pygame.time.Clock()\nx = 0\nrunning = True\nwhile running:\n    for event in pygame.event.get():\n        if event.type == pygame.QUIT:\n            running = False\n    x = (x + 4) % 640\n    screen.fill((20, 20, 30))\n    pygame.draw.circle(screen, (255, 212, 59), (x, 240), 20)\n    pygame.display.flip()\n    clock.tick(60)\npygame.quit()",
  },
  {
    id: "send-http-post",
    topic: "Working with APIs",
    questions: [
      "How do I send a POST request in Python?",
      "How do I send JSON to an API?",
      "How do I add headers or an API key to a request?",
    ],
    keywords: ["post", "requests", "json", "headers", "api key", "http", "status code"],
    answer:
      "With requests, pass a dict to json= and it's encoded and sent with the right Content-Type. Add headers= for things like an Authorization token, always set a timeout, and call raise_for_status() to turn HTTP errors into exceptions. Keep API keys in environment variables, not in your code.",
    code: 'import os, requests\n\nresp = requests.post(\n    "https://api.example.com/notes",\n    json={"title": "Hello", "done": False},\n    headers={"Authorization": f"Bearer {os.environ[\'API_KEY\']}"},\n    timeout=10,\n)\nresp.raise_for_status()\nprint(resp.json())',
  },
  {
    id: "datetime-timezones",
    topic: "Working with data",
    questions: [
      "How do I work with time zones in Python?",
      "How do I convert UTC to local time?",
      "What is zoneinfo?",
    ],
    keywords: ["timezone", "utc", "zoneinfo", "aware", "naive", "local time"],
    answer:
      "Use timezone-aware datetimes. datetime.now(timezone.utc) gives the current UTC time, and zoneinfo (built in since Python 3.9) knows real time zones with daylight saving. Store and compare times in UTC and convert to local time only for display.",
    code: 'from datetime import datetime, timezone\nfrom zoneinfo import ZoneInfo\n\nnow_utc = datetime.now(timezone.utc)\nnow_utc.astimezone(ZoneInfo("Asia/Kolkata"))\nnow_utc.astimezone(ZoneInfo("America/New_York"))',
  },
];
