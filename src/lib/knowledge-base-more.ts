import type { KbEntry } from "./knowledge-base";

/** Deeper coverage: stdlib specifics, OOP extras, specific errors, data tools and classic exercises. */
export const moreKnowledge: KbEntry[] = [
  // ---------- Everyday list and string operations ----------
  {
    id: "list-everyday",
    topic: "Lists",
    questions: [
      "How do I merge two lists?",
      "How do I get the length of a list?",
      "How do I check if an item is in a list?",
      "How do I get the last item of a list?",
      "What is negative indexing?",
    ],
    keywords: [
      "merge",
      "concatenate",
      "combine",
      "length",
      "len",
      "contains",
      "in",
      "last",
      "negative",
      "index",
    ],
    answer:
      "Join two lists with + (makes a new list) or a.extend(b) (changes a in place). len(items) gives the number of items, and `x in items` checks membership. Negative indexes count from the end: items[-1] is the last item, items[-2] the one before.",
    code: "a = [1, 2]\nb = [3, 4]\nmerged = a + b      # [1, 2, 3, 4]\nlen(merged)         # 4\n3 in merged         # True\nmerged[-1]          # 4 (last item)\nmerged[-2]          # 3",
  },
  {
    id: "string-search",
    topic: "Strings",
    questions: [
      "How do I check if a string contains a substring?",
      "How do I find the position of a word in a string?",
      "How do I check if a string starts with something?",
      "How do I count characters in a string?",
    ],
    keywords: [
      "contains",
      "substring",
      "in",
      "find",
      "index",
      "startswith",
      "endswith",
      "count",
      "search",
    ],
    answer:
      "Use the `in` operator to test whether text appears in a string. find() returns the position of the first match (or -1), index() does the same but raises ValueError if missing. startswith() and endswith() check the edges, and count() counts occurrences. All are case-sensitive, so lower() both sides for a case-insensitive check.",
    code: 'text = "Hello Python"\n"Python" in text          # True\ntext.find("Py")           # 6\ntext.startswith("Hell")   # True\ntext.count("o")           # 2\n"python" in text.lower()  # case-insensitive',
  },
  {
    id: "packages-init",
    topic: "Modules and imports",
    questions: [
      "What is __init__.py?",
      "What is a package in Python?",
      "How do I organise code into folders?",
      "What is a relative import?",
    ],
    keywords: ["package", "__init__", "init.py", "folder", "relative", "import"],
    answer:
      "A module is one .py file; a package is a folder of modules. An __init__.py file marks the folder as a regular package and runs when the package is first imported, so you can use it to expose a tidy public API. Inside a package, relative imports like `from .utils import helper` refer to sibling modules.",
    code: "myapp/\n    __init__.py        # makes myapp a package\n    utils.py\n    models/\n        __init__.py\n        user.py\n\n# in myapp/models/user.py\nfrom ..utils import slugify\n\n# elsewhere\nfrom myapp.models.user import User",
  },
  {
    id: "exit-program",
    topic: "Getting started",
    questions: [
      "How do I exit a Python program?",
      "What does sys.exit do?",
      "How do I stop a script early?",
    ],
    keywords: ["exit", "quit", "stop", "sys.exit", "terminate", "end"],
    answer:
      "Call sys.exit() to stop a program. Pass 0 (or nothing) for success and a non-zero number or an error message for failure — other programs and shells read that exit code. Inside a function, a plain return is often all you need. exit() and quit() exist too but are meant for the interactive shell.",
    code: 'import sys\n\nif len(sys.argv) < 2:\n    sys.exit("usage: python app.py <file>")   # prints message, exit code 1\n\nsys.exit(0)   # success',
  },
  // ---------- Data structures and algorithms ----------
  {
    id: "stack-queue",
    topic: "Data structures",
    questions: [
      "What is a stack?",
      "What is a queue?",
      "How do I implement a stack in Python?",
      "How do I implement a queue in Python?",
    ],
    keywords: ["stack", "queue", "lifo", "fifo", "push", "pop", "deque", "enqueue"],
    answer:
      "A stack is last-in, first-out (LIFO): the last item added is the first removed, like a pile of plates. A plain list works: append() to push, pop() to pop. A queue is first-in, first-out (FIFO), like a line at a shop. Use collections.deque with append() and popleft(), because list.pop(0) is slow on long lists.",
    code: "from collections import deque\n\nstack = []\nstack.append(1); stack.append(2)\nstack.pop()        # 2  (last in, first out)\n\nqueue = deque()\nqueue.append('a'); queue.append('b')\nqueue.popleft()    # 'a' (first in, first out)",
  },
  {
    id: "linked-list",
    topic: "Data structures",
    questions: [
      "How do I implement a linked list in Python?",
      "What is a linked list?",
      "What is a binary tree?",
    ],
    keywords: ["linked list", "node", "tree", "binary tree", "next", "pointer"],
    answer:
      "A linked list is a chain of nodes where each node stores a value and a reference to the next node. A binary tree is similar, but each node has a left and a right child. In Python you build both with a small class. Day to day, the built-in list and deque usually serve better — linked structures mostly appear in interviews and courses.",
    code: "class Node:\n    def __init__(self, value, next=None):\n        self.value = value\n        self.next = next\n\nhead = Node(1, Node(2, Node(3)))\n\nnode = head\nwhile node:\n    print(node.value)   # 1 2 3\n    node = node.next",
  },
  {
    id: "binary-search",
    topic: "Algorithms",
    questions: [
      "How does binary search work?",
      "Write a binary search in Python",
      "What is the bisect module?",
    ],
    keywords: ["binary search", "bisect", "search", "sorted", "halve"],
    answer:
      "Binary search finds an item in a sorted list by repeatedly checking the middle and discarding the half that can't contain it, so it needs only about log2(n) steps — 20 checks for a million items. The bisect module provides a ready-made, fast version.",
    code: "def binary_search(items, target):\n    lo, hi = 0, len(items) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if items[mid] == target:\n            return mid\n        if items[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n\nimport bisect\nbisect.bisect_left([1, 3, 5, 7], 5)   # 2",
  },
  {
    id: "sorting-algorithms",
    topic: "Algorithms",
    questions: [
      "How does bubble sort work?",
      "Write a sorting algorithm in Python",
      "What sorting algorithm does Python use?",
    ],
    keywords: ["bubble sort", "insertion sort", "merge sort", "quicksort", "algorithm", "timsort"],
    answer:
      "Bubble sort repeatedly swaps neighbouring items that are out of order until a full pass makes no swaps — easy to understand but O(n²). Python's own sorted() and list.sort() use Timsort, a fast, stable O(n log n) algorithm, so use those in real code.",
    code: "def bubble_sort(items):\n    items = list(items)\n    for end in range(len(items) - 1, 0, -1):\n        swapped = False\n        for i in range(end):\n            if items[i] > items[i + 1]:\n                items[i], items[i + 1] = items[i + 1], items[i]\n                swapped = True\n        if not swapped:\n            break\n    return items\n\nbubble_sort([5, 2, 9, 1])   # [1, 2, 5, 9]",
  },
  {
    id: "big-o",
    topic: "Algorithms",
    questions: [
      "What is Big O notation?",
      "What is time complexity?",
      "Which is faster, a list or a set lookup?",
    ],
    keywords: ["big o", "complexity", "time complexity", "o(n)", "o(1)", "efficient", "lookup"],
    answer:
      "Big O describes how the work grows as the input grows. O(1) is constant, O(log n) grows slowly (binary search), O(n) grows in step with the input (a loop), and O(n²) grows fast (a loop inside a loop). In Python, `x in a_list` is O(n) but `x in a_set` or `key in a_dict` is O(1) on average — switch to a set when you check membership often.",
    code: "items = list(range(1_000_000))\nlookup = set(items)\n\n999_999 in items    # O(n): scans the list\n999_999 in lookup   # O(1): hash lookup, much faster",
  },
  // ---------- Strings and formatting ----------
  {
    id: "fstrings-format",
    topic: "Strings",
    questions: [
      "What is an f string?",
      "What is an f-string?",
      "How do f-strings work?",
      "How do I format a number to 2 decimal places?",
      "How do I format strings in Python?",
      "How do I pad a number with zeros?",
    ],
    keywords: ["fstring", "format", "decimal", "padding", "round", "placeholder"],
    answer:
      'Prefix a string with f and put expressions in braces. After a colon you can add a format spec: .2f for two decimals, , for thousands separators, 05d for zero-padding, > or < for alignment, and % for percentages. Adding = after the expression (f"{x=}") prints the name and value, which is handy for debugging.',
    code: 'price = 1234.5\nname = "Ada"\nf"{name} owes ${price:,.2f}"   # Ada owes $1,234.50\nf"{7:03d}"                    # 007\nf"{0.256:.1%}"                # 25.6%\nf"{name:>8}|"                 # "     Ada|"\nx = 42; f"{x=}"               # "x=42"',
  },
  {
    id: "split-join",
    topic: "Strings",
    questions: [
      "How do I split a string into a list?",
      "How do I join a list into a string?",
      "How do I convert a string to a list of words?",
      "How do I remove whitespace from a string?",
    ],
    keywords: ["split", "join", "strip", "words", "separator", "whitespace"],
    answer:
      "str.split(sep) breaks a string into a list — with no argument it splits on any run of whitespace. sep.join(items) goes the other way and glues a list of strings together. strip(), lstrip() and rstrip() remove surrounding whitespace (or the characters you pass).",
    code: '"a,b,c".split(",")        # ["a", "b", "c"]\n"  hello   world ".split() # ["hello", "world"]\n"-".join(["2026", "10", "23"])  # "2026-10-23"\n"  padded  ".strip()     # "padded"\nlist("abc")               # ["a", "b", "c"]',
  },
  {
    id: "reverse-palindrome",
    topic: "Classic programs",
    questions: [
      "How do I reverse a string?",
      "How do I check if a string is a palindrome?",
      "Write a palindrome program in Python",
    ],
    keywords: ["reverse", "palindrome", "string", "backwards"],
    answer:
      "Slicing with a step of -1 reverses any sequence, so s[::-1] is the reversed string. A palindrome reads the same both ways: normalise the text (lowercase, keep only letters and digits) and compare it with its reverse.",
    code: 'def is_palindrome(text: str) -> bool:\n    clean = "".join(ch.lower() for ch in text if ch.isalnum())\n    return clean == clean[::-1]\n\n"python"[::-1]                          # "nohtyp"\nis_palindrome("A man, a plan, a canal: Panama")  # True',
  },
  {
    id: "unicode-bytes",
    topic: "Strings",
    questions: [
      "What is the difference between bytes and str?",
      "How do I encode and decode strings?",
      "What is a UnicodeDecodeError?",
    ],
    keywords: ["bytes", "unicode", "utf-8", "encode", "decode", "encoding"],
    answer:
      'str holds text (Unicode characters); bytes holds raw 8-bit values. encode() turns text into bytes using an encoding, decode() turns bytes back into text. A UnicodeDecodeError means the bytes were not valid in the encoding you chose — pass encoding="utf-8" when opening files so you don\'t rely on the platform default.',
    code: 'data = "café".encode("utf-8")   # b"caf\\xc3\\xa9"\ndata.decode("utf-8")            # "café"\n\nwith open("notes.txt", encoding="utf-8") as f:\n    text = f.read()',
  },
  // ---------- Built-ins and functional tools ----------
  {
    id: "map-filter-reduce",
    topic: "Functions",
    questions: [
      "How do map and filter work?",
      "What is reduce in Python?",
      "Should I use map or a list comprehension?",
    ],
    keywords: ["map", "filter", "reduce", "functools", "functional"],
    answer:
      "map(f, items) applies f to every item, filter(f, items) keeps items where f returns true, and functools.reduce(f, items) folds a sequence into one value. They return lazy iterators, so wrap them in list() to see results. Most Python code prefers comprehensions for readability; reach for map when you already have a named function.",
    code: "from functools import reduce\n\nnums = [1, 2, 3, 4]\nlist(map(str, nums))                       # ['1', '2', '3', '4']\nlist(filter(lambda n: n % 2 == 0, nums))   # [2, 4]\nreduce(lambda a, b: a * b, nums)           # 24\n[n * n for n in nums if n > 1]             # [4, 9, 16]",
  },
  {
    id: "builtins-any-all",
    topic: "Built-in functions",
    questions: [
      "What do any and all do?",
      "What are useful built-in functions?",
      "How do I find the max or min of a list?",
      "How do I sum a list?",
    ],
    keywords: ["any", "all", "sum", "min", "max", "len", "builtin", "abs"],
    answer:
      "Python ships handy built-ins: len, sum, min, max, abs, round, sorted, reversed, any, all, zip, enumerate. any() is true if at least one item is truthy; all() is true if every item is. min and max accept a key= function and a default= for empty inputs.",
    code: 'scores = [72, 95, 88]\nsum(scores) / len(scores)     # 85.0\nmax(scores), min(scores)      # (95, 72)\nany(s > 90 for s in scores)   # True\nall(s > 50 for s in scores)   # True\nmax(["pear", "fig"], key=len) # "pear"',
  },
  {
    id: "type-isinstance",
    topic: "Data types",
    questions: [
      "How do I check the type of a variable?",
      "What is the difference between type and isinstance?",
      "How do I check if a variable is a number?",
    ],
    keywords: ["type", "isinstance", "check", "class"],
    answer:
      "type(x) returns the exact class of x. isinstance(x, cls) checks whether x is an instance of cls or any subclass, and it accepts a tuple of types. Prefer isinstance for checks because it respects inheritance.",
    code: "type(3)                         # <class 'int'>\nisinstance(3, int)              # True\nisinstance(3.5, (int, float))   # True\nisinstance(True, int)           # True — bool subclasses int",
  },
  {
    id: "ternary-walrus",
    topic: "Conditionals",
    questions: [
      "Does Python have a ternary operator?",
      "What is the walrus operator?",
      "How do I write an if else in one line?",
    ],
    keywords: ["ternary", "walrus", "one line", "inline", "assignment expression", ":="],
    answer:
      "The conditional expression is `value_if_true if condition else value_if_false`. The walrus operator := (Python 3.8+) assigns a value inside an expression, which avoids computing something twice in a while loop or comprehension.",
    code: 'age = 20\nstatus = "adult" if age >= 18 else "minor"\n\nwhile (line := input("> ")) != "quit":\n    print(line.upper())',
  },
  {
    id: "match-case",
    topic: "Conditionals",
    questions: [
      "Does Python have a switch statement?",
      "How does match case work?",
      "What is structural pattern matching?",
    ],
    keywords: ["switch", "match", "case", "pattern"],
    answer:
      "Python 3.10 added match/case, which is more powerful than a classic switch: it can match literal values, unpack sequences, check types and capture parts of a structure. The `_` case is the catch-all. On older versions use if/elif or a dictionary of functions.",
    code: 'def handle(command):\n    match command.split():\n        case ["go", direction]:\n            return f"moving {direction}"\n        case ["quit" | "exit"]:\n            return "bye"\n        case _:\n            return "unknown command"',
  },
  {
    id: "math-operators",
    topic: "Operators",
    questions: [
      "How do I use the math module?",
      "What math functions does Python have?",
      "What is the math module?",
      "What is the difference between / and //?",
      "How does the modulo operator work?",
      "How do I raise a number to a power?",
      "How do I round a number?",
    ],
    keywords: ["math", "division", "floor", "modulo", "remainder", "power", "exponent", "round"],
    answer:
      "/ always returns a float, // is floor division, % gives the remainder, and ** raises to a power. round(x, n) rounds to n digits using banker's rounding (ties go to the even number), so round(2.5) is 2. For a whole number in both directions use math.floor and math.ceil.",
    code: "7 / 2      # 3.5\n7 // 2     # 3\n7 % 2      # 1\n2 ** 10    # 1024\nround(3.14159, 2)   # 3.14\nround(2.5)          # 2\nimport math; math.ceil(2.1)   # 3",
  },
  // ---------- Collections ----------
  {
    id: "list-methods",
    topic: "Lists",
    questions: [
      "How do I add an item to a list?",
      "What is the difference between append and extend?",
      "How do I remove an item from a list?",
      "How do I find the index of an item in a list?",
    ],
    keywords: ["append", "extend", "insert", "remove", "pop", "index", "count", "clear"],
    answer:
      "append(x) adds one item at the end, extend(iterable) adds every item from another iterable, and insert(i, x) puts x at position i. remove(x) deletes the first matching value, pop(i) removes by position and returns it, and del lst[i] deletes without returning. index(x) finds a position and count(x) counts occurrences.",
    code: 'langs = ["python"]\nlangs.append("rust")          # ["python", "rust"]\nlangs.extend(["go", "c"])     # adds two items\nlangs.insert(0, "js")\nlangs.remove("go")\nlast = langs.pop()            # "c"\nlangs.index("rust")           # 2',
  },
  {
    id: "remove-duplicates",
    topic: "Classic programs",
    questions: [
      "How do I remove duplicates from a list?",
      "How do I keep order while removing duplicates?",
      "How do I get unique values from a list?",
    ],
    keywords: ["duplicate", "unique", "dedupe", "distinct", "set"],
    answer:
      "Converting to a set removes duplicates but loses order. To keep the first occurrence order, use dict.fromkeys(items) — dictionaries preserve insertion order — then turn it back into a list.",
    code: "items = [3, 1, 3, 2, 1]\nlist(set(items))             # order not guaranteed\nlist(dict.fromkeys(items))   # [3, 1, 2]",
  },
  {
    id: "flatten-list",
    topic: "Classic programs",
    questions: ["How do I flatten a list of lists?", "How do I flatten a nested list?"],
    keywords: ["flatten", "nested", "list of lists", "chain"],
    answer:
      "For one level of nesting, a double comprehension or itertools.chain.from_iterable is the clearest. For arbitrarily deep nesting, write a small recursive generator.",
    code: "from itertools import chain\n\ngrid = [[1, 2], [3], [4, 5]]\n[x for row in grid for x in row]        # [1, 2, 3, 4, 5]\nlist(chain.from_iterable(grid))\n\ndef flatten(items):\n    for item in items:\n        if isinstance(item, list):\n            yield from flatten(item)\n        else:\n            yield item",
  },
  {
    id: "word-frequency",
    topic: "Classic programs",
    questions: [
      "How do I count words in a string?",
      "How do I count the frequency of each character?",
      "How do I find the most common item in a list?",
    ],
    keywords: ["count", "frequency", "occurrence", "most common", "counter", "words"],
    answer:
      "collections.Counter counts hashable items for you. Feed it a list of words or a string of characters, then use most_common(n) for the top results.",
    code: 'from collections import Counter\n\ntext = "the cat and the hat"\nwords = Counter(text.split())\nwords.most_common(1)      # [("the", 2)]\nCounter("banana")         # Counter({"a": 3, "n": 2, "b": 1})',
  },
  {
    id: "merge-sort-dicts",
    topic: "Dictionaries",
    questions: [
      "How do I sort a dictionary by value?",
      "How do I combine two dictionaries with |?",
      "How do I invert a dictionary?",
    ],
    keywords: ["merge", "combine", "update", "sort", "value", "invert", "|"],
    answer:
      "Use a | b (Python 3.9+) or {**a, **b} to merge — keys in b win. To sort by value, pass items() to sorted with a key function and rebuild a dict. Invert with a dict comprehension (values must be unique and hashable).",
    code: 'a = {"x": 1, "y": 2}\nb = {"y": 3, "z": 0}\na | b                                           # {"x": 1, "y": 3, "z": 0}\ndict(sorted(a.items(), key=lambda kv: kv[1], reverse=True))\n{v: k for k, v in a.items()}                    # {1: "x", 2: "y"}',
  },
  {
    id: "set-operations",
    topic: "Sets",
    questions: [
      "How do I find common elements between two lists?",
      "What are set union and intersection?",
      "How do I find the difference between two lists?",
    ],
    keywords: ["union", "intersection", "difference", "common", "symmetric"],
    answer:
      "Sets support maths-style operators: | for union, & for intersection, - for difference, and ^ for items in exactly one set. Convert lists to sets first; membership tests on sets are O(1) on average.",
    code: "a = {1, 2, 3}\nb = {2, 3, 4}\na | b   # {1, 2, 3, 4}\na & b   # {2, 3}\na - b   # {1}\na ^ b   # {1, 4}\nset([1, 2]) & set([2, 5])  # {2}",
  },
  {
    id: "unpacking-swap",
    topic: "Tuples",
    questions: [
      "How do I swap two variables?",
      "What is tuple unpacking?",
      "How do I return multiple values from a function?",
    ],
    keywords: ["swap", "unpack", "multiple", "return", "star"],
    answer:
      "Assignment can unpack any iterable into several names, so a, b = b, a swaps without a temp variable. Functions return multiple values by returning a tuple, which the caller unpacks. A starred name collects the leftovers.",
    code: "a, b = 1, 2\na, b = b, a          # a=2, b=1\n\ndef min_max(nums):\n    return min(nums), max(nums)\n\nlo, hi = min_max([4, 9, 1])\nfirst, *rest = [1, 2, 3]   # rest = [2, 3]",
  },
  {
    id: "collections-module",
    topic: "Standard library",
    questions: [
      "What is defaultdict?",
      "What is a namedtuple?",
      "What is a deque?",
      "What is in the collections module?",
    ],
    keywords: ["defaultdict", "namedtuple", "deque", "counter", "ordereddict", "collections"],
    answer:
      "collections offers specialised containers: defaultdict creates missing keys with a default factory, Counter tallies items, deque gives fast appends and pops from both ends (great for queues), and namedtuple builds lightweight immutable records with named fields.",
    code: 'from collections import defaultdict, deque, namedtuple\n\ngroups = defaultdict(list)\ngroups["a"].append(1)          # no KeyError\n\nqueue = deque([1, 2]); queue.appendleft(0); queue.pop()\n\nPoint = namedtuple("Point", "x y")\np = Point(3, 4); p.x            # 3',
  },
  {
    id: "itertools-functools",
    topic: "Standard library",
    questions: [
      "What is itertools used for?",
      "How do I get all combinations or permutations?",
      "What is lru_cache?",
      "How do I memoize a function?",
    ],
    keywords: [
      "itertools",
      "combinations",
      "permutations",
      "product",
      "groupby",
      "lru_cache",
      "cache",
      "memoize",
      "partial",
    ],
    answer:
      "itertools builds efficient iterators: combinations, permutations, product, groupby, chain, islice and more. functools adds tools for functions — @lru_cache (or @cache) memoizes results so repeated calls are instant, and partial pre-fills arguments.",
    code: "from itertools import combinations, permutations\nfrom functools import lru_cache\n\nlist(combinations('abc', 2))   # [('a','b'), ('a','c'), ('b','c')]\nlen(list(permutations(range(4))))  # 24\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)",
  },
  // ---------- Classic programs ----------
  {
    id: "fibonacci",
    topic: "Classic programs",
    questions: [
      "How do I print the Fibonacci sequence?",
      "Write a Fibonacci program in Python",
      "How do I find the nth Fibonacci number?",
    ],
    keywords: ["fibonacci", "sequence", "series"],
    answer:
      "Each Fibonacci number is the sum of the two before it. An iterative loop with tuple unpacking is simple and fast; a generator lets you stream as many terms as you need.",
    code: "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nlist(fibonacci(10))   # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
  },
  {
    id: "factorial",
    topic: "Classic programs",
    questions: ["How do I calculate a factorial?", "Write a factorial program in Python"],
    keywords: ["factorial", "product"],
    answer:
      "math.factorial(n) is built in. Writing it yourself is a classic exercise: a loop that multiplies 1..n, or a recursive function with a base case of 0 or 1.",
    code: "import math\nmath.factorial(5)   # 120\n\ndef factorial(n: int) -> int:\n    result = 1\n    for i in range(2, n + 1):\n        result *= i\n    return result",
  },
  {
    id: "prime-numbers",
    topic: "Classic programs",
    questions: [
      "How do I check if a number is prime?",
      "Write a prime number program in Python",
      "How do I find all primes up to n?",
    ],
    keywords: ["prime", "sieve", "divisor"],
    answer:
      "A number n > 1 is prime if nothing from 2 up to √n divides it evenly, so you only need to test that far. To list every prime up to n, the Sieve of Eratosthenes is much faster than testing each number.",
    code: "def is_prime(n: int) -> bool:\n    if n < 2:\n        return False\n    return all(n % d for d in range(2, int(n ** 0.5) + 1))\n\ndef primes_up_to(n):\n    sieve = [True] * (n + 1)\n    sieve[:2] = [False, False]\n    for i in range(2, int(n ** 0.5) + 1):\n        if sieve[i]:\n            sieve[i * i :: i] = [False] * len(sieve[i * i :: i])\n    return [i for i, ok in enumerate(sieve) if ok]",
  },
  {
    id: "even-odd-largest",
    topic: "Classic programs",
    questions: [
      "How do I check if a number is even or odd?",
      "How do I find the second largest number in a list?",
      "How do I find the largest of three numbers?",
    ],
    keywords: ["even", "odd", "largest", "second largest", "biggest"],
    answer:
      "n % 2 == 0 means n is even. max() finds the largest value directly, even among separate arguments. For the second largest, remove duplicates, sort, and take the item before last — or use heapq.nlargest.",
    code: 'n = 7\n"even" if n % 2 == 0 else "odd"     # \'odd\'\nmax(4, 9, 2)                         # 9\n\nnums = [5, 9, 9, 3]\nsorted(set(nums))[-2]                # 5\nimport heapq; heapq.nlargest(2, set(nums))  # [9, 5]',
  },
  {
    id: "input-validation",
    topic: "Input and output",
    questions: [
      "How do I keep asking until the user enters a valid number?",
      "How do I convert input to an integer safely?",
      "Why does input return a string?",
    ],
    keywords: ["input", "validate", "int", "convert", "valueerror", "retry"],
    answer:
      "input() always returns a string, so convert it with int() or float(). Conversion raises ValueError on bad text — wrap it in try/except inside a loop and only break out once you have a valid value.",
    code: 'while True:\n    raw = input("Age: ")\n    try:\n        age = int(raw)\n        break\n    except ValueError:\n        print("Please enter a whole number.")',
  },
  // ---------- OOP extras ----------
  {
    id: "classmethod-staticmethod",
    topic: "OOP basics",
    questions: [
      "What is the difference between classmethod and staticmethod?",
      "When should I use a static method?",
      "What is an alternative constructor?",
    ],
    keywords: ["classmethod", "staticmethod", "cls", "factory", "constructor"],
    answer:
      "A regular method receives the instance (self). A @classmethod receives the class (cls), which makes it ideal for alternative constructors. A @staticmethod receives neither — it is just a function grouped inside the class namespace.",
    code: 'class Date:\n    def __init__(self, y, m, d):\n        self.y, self.m, self.d = y, m, d\n\n    @classmethod\n    def from_string(cls, text):\n        return cls(*map(int, text.split("-")))\n\n    @staticmethod\n    def is_leap(year):\n        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)\n\nDate.from_string("2026-10-23")',
  },
  {
    id: "property",
    topic: "OOP basics",
    questions: [
      "What is @property in Python?",
      "How do I write getters and setters?",
      "How do I validate an attribute when it is set?",
    ],
    keywords: ["property", "getter", "setter", "attribute", "validate"],
    answer:
      "@property turns a method into an attribute you read without parentheses. Add a matching @name.setter to run validation on assignment. Start with plain attributes and switch to a property later — callers don't need to change.",
    code: 'class Temperature:\n    def __init__(self, celsius):\n        self.celsius = celsius\n\n    @property\n    def celsius(self):\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value):\n        if value < -273.15:\n            raise ValueError("below absolute zero")\n        self._celsius = value\n\n    @property\n    def fahrenheit(self):\n        return self._celsius * 9 / 5 + 32',
  },
  {
    id: "dataclasses",
    topic: "OOP basics",
    questions: [
      "What is a dataclass?",
      "How do I make a simple class without writing __init__?",
      "When should I use dataclasses?",
    ],
    keywords: ["dataclass", "record", "boilerplate", "field", "frozen"],
    answer:
      "@dataclass generates __init__, __repr__ and __eq__ from type-annotated fields, so data-holding classes take a few lines. Use field(default_factory=list) for mutable defaults and frozen=True to make instances immutable.",
    code: "from dataclasses import dataclass, field\n\n@dataclass\nclass Student:\n    name: str\n    grade: int = 1\n    courses: list[str] = field(default_factory=list)\n\ns = Student(\"Ada\")\nprint(s)   # Student(name='Ada', grade=1, courses=[])",
  },
  {
    id: "abstract-mro",
    topic: "OOP basics",
    questions: [
      "What is abstraction in Python?",
      "What is an abstract class in Python?",
      "Does Python support multiple inheritance?",
      "What is MRO?",
      "What does super() do?",
    ],
    keywords: [
      "abstract",
      "abc",
      "abstractmethod",
      "multiple inheritance",
      "mro",
      "super",
      "interface",
    ],
    answer:
      "Inherit from abc.ABC and mark methods with @abstractmethod to force subclasses to implement them — the base class cannot be instantiated. Python supports multiple inheritance; the method resolution order (Class.__mro__) decides which parent is searched first, and super() follows that order.",
    code: "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> float: ...\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n\n    def area(self):\n        return self.side ** 2\n\nSquare(3).area()   # 9\n# Shape()          # TypeError: can't instantiate abstract class",
  },
  {
    id: "enum",
    topic: "Standard library",
    questions: ["How do I use enums in Python?", "What is an Enum?"],
    keywords: ["enum", "constant", "choices", "auto"],
    answer:
      "enum.Enum defines a fixed set of named constants. Members compare by identity, can be iterated, and print nicely, which beats scattering magic strings through your code.",
    code: "from enum import Enum, auto\n\nclass Status(Enum):\n    ACTIVE = auto()\n    BANNED = auto()\n\nStatus.ACTIVE.name        # 'ACTIVE'\nStatus['BANNED']          # Status.BANNED\n[s.name for s in Status]  # ['ACTIVE', 'BANNED']",
  },
  // ---------- Functions extras ----------
  {
    id: "closures",
    topic: "Functions",
    questions: [
      "What is a closure in Python?",
      "What is a nested function?",
      "What does nonlocal do?",
    ],
    keywords: ["closure", "nested", "inner", "nonlocal", "factory"],
    answer:
      "A function defined inside another function can use the outer function's variables even after the outer one returns — that captured environment is a closure. Use nonlocal when the inner function needs to reassign the captured variable.",
    code: "def make_counter():\n    count = 0\n    def increment():\n        nonlocal count\n        count += 1\n        return count\n    return increment\n\ntick = make_counter()\ntick(); tick()   # 2",
  },
  {
    id: "main-guard",
    topic: "Modules and imports",
    questions: [
      "What does if __name__ == '__main__' mean?",
      "Why use a main function in Python?",
      "What is __name__?",
    ],
    keywords: ["__name__", "__main__", "main", "script", "entry point"],
    answer:
      "Each module has a __name__. When a file is run directly it is \"__main__\"; when it is imported it is the module's name. Putting script code under the guard means importing the file won't run it.",
    code: 'def main():\n    print("running as a script")\n\nif __name__ == "__main__":\n    main()',
  },
  {
    id: "keyword-only-defaults",
    topic: "Functions",
    questions: [
      "What are default arguments?",
      "What are keyword arguments?",
      "What does a bare * mean in a function signature?",
    ],
    keywords: ["default", "keyword", "positional", "argument", "parameter", "keyword-only"],
    answer:
      "Parameters can have defaults (def f(x, y=2)). Callers can pass arguments by name in any order. A bare * forces everything after it to be passed by keyword, and a / (3.8+) forces the parameters before it to be positional-only.",
    code: 'def connect(host, port=5432, *, timeout=10):\n    ...\n\nconnect("db.local")\nconnect("db.local", 6543, timeout=3)\n# connect("db.local", 6543, 3)  # TypeError: timeout is keyword-only',
  },
  // ---------- Specific errors ----------
  {
    id: "error-attribute",
    topic: "Common errors",
    questions: [
      "What does AttributeError mean?",
      "Why do I get 'NoneType' object has no attribute?",
    ],
    keywords: ["attributeerror", "nonetype", "attribute", "has no attribute"],
    answer:
      "AttributeError means you asked an object for an attribute or method it does not have. The most common case is 'NoneType' object has no attribute — a function returned None (often a method that modifies in place, like list.sort()) and you then used the result.",
    code: "nums = [3, 1, 2]\nresult = nums.sort()   # sort() returns None!\n# result.append(4)     # AttributeError: 'NoneType' object has no attribute 'append'\nresult = sorted(nums)  # returns a new list",
  },
  {
    id: "error-zero-division-value",
    topic: "Common errors",
    questions: [
      "What is ZeroDivisionError?",
      "What does ValueError invalid literal for int mean?",
      "How do I avoid dividing by zero?",
    ],
    keywords: ["zerodivisionerror", "valueerror", "invalid literal", "divide by zero"],
    answer:
      'ZeroDivisionError is raised for x / 0, x // 0 and x % 0 — check the divisor first or catch the error. ValueError: invalid literal for int() means the string isn\'t a whole number ("3.5", "", "abc"); convert with float() first or validate the input.',
    code: 'def safe_avg(values):\n    return sum(values) / len(values) if values else 0.0\n\nint("42")        # 42\n# int("3.5")     # ValueError\nint(float("3.5"))  # 3',
  },
  {
    id: "error-module-not-found",
    topic: "Common errors",
    questions: [
      "How do I fix ModuleNotFoundError?",
      "Why can't Python find my module?",
      "I installed a package but import still fails",
    ],
    keywords: ["modulenotfounderror", "importerror", "no module named", "pip", "install"],
    answer:
      "ModuleNotFoundError means the interpreter running your code cannot see the package. Usually pip installed it into a different Python. Install with `python -m pip install name` using the same python you run, activate your virtual environment, and make sure your own file isn't named like the module (e.g. random.py).",
    code: 'python -m pip install requests\npython -c "import sys; print(sys.executable)"   # which Python is running?',
  },
  {
    id: "error-unbound-local",
    topic: "Common errors",
    questions: [
      "What is UnboundLocalError?",
      "Why can't I change a global variable inside a function?",
    ],
    keywords: ["unboundlocalerror", "local variable", "referenced before assignment", "global"],
    answer:
      "If a function assigns to a name anywhere in its body, Python treats that name as local for the whole function. Reading it before the assignment raises UnboundLocalError. Declare global (or nonlocal) if you really mean the outer variable — or better, pass it in and return the new value.",
    code: "count = 0\n\ndef bump():\n    global count\n    count += 1   # without 'global' this raises UnboundLocalError",
  },
  {
    id: "error-syntax",
    topic: "Common errors",
    questions: [
      "What does SyntaxError invalid syntax mean?",
      "Why do I get unexpected EOF while parsing?",
    ],
    keywords: ["syntaxerror", "invalid syntax", "eof", "colon", "parenthesis", "bracket"],
    answer:
      "A SyntaxError means Python couldn't parse the code, so nothing ran. Look at the reported line and the one before it: missing colons after if/for/def, unclosed brackets or quotes, = instead of == in a condition, and missing commas are the usual suspects.",
    code: '# if x > 3       <- missing colon\nif x > 3:\n    print("ok")\n\n# print("hi"    <- unclosed bracket: \'unexpected EOF\'',
  },
  // ---------- Stdlib specifics ----------
  {
    id: "json",
    topic: "Working with data",
    questions: [
      "What is JSON?",
      "How do I read a JSON file?",
      "How do I convert a dictionary to JSON?",
      "How do I parse a JSON string?",
    ],
    keywords: ["json", "load", "dump", "parse", "serialize"],
    answer:
      "json.loads parses a string and json.load reads from a file; json.dumps and json.dump do the reverse. Use indent=2 for readable output. JSON objects become dicts, arrays become lists.",
    code: 'import json\n\ndata = json.loads(\'{"name": "Ada", "langs": ["py"]}\')\njson.dumps(data, indent=2)\n\nwith open("config.json", encoding="utf-8") as f:\n    config = json.load(f)\nwith open("out.json", "w", encoding="utf-8") as f:\n    json.dump(config, f, indent=2)',
  },
  {
    id: "datetime-details",
    topic: "Working with data",
    questions: [
      "How do I get the current date and time?",
      "How do I format a date as a string?",
      "How do I parse a date string?",
      "How do I find the difference between two dates?",
    ],
    keywords: ["datetime", "date", "time", "strftime", "strptime", "timedelta", "now", "today"],
    answer:
      "datetime.now() gives the current local time and date.today() the date. strftime formats a datetime into text, strptime parses text into a datetime, and subtracting two dates gives a timedelta.",
    code: 'from datetime import datetime, date\n\nnow = datetime.now()\nnow.strftime("%Y-%m-%d %H:%M")          # "2026-10-23 18:30"\nd = datetime.strptime("23/10/2026", "%d/%m/%Y")\n(date(2026, 12, 25) - date(2026, 10, 23)).days   # 63',
  },
  {
    id: "regex-details",
    topic: "Working with data",
    questions: [
      "How do I find all numbers in a string?",
      "How do I validate an email with regex?",
      "What is the difference between re.match and re.search?",
      "How do I replace text with regex?",
    ],
    keywords: ["regex", "re", "pattern", "findall", "search", "sub", "email"],
    answer:
      'The re module handles regular expressions. re.search finds the first match anywhere, re.match only at the start, re.fullmatch the whole string, re.findall returns every match, and re.sub replaces. Use raw strings (r"...") so backslashes aren\'t escaped twice.',
    code: 'import re\n\nre.findall(r"\\d+", "a1 b22 c333")       # ["1", "22", "333"]\nbool(re.fullmatch(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", "ada@example.com"))  # True\nre.sub(r"\\s+", " ", "too    many   spaces")  # "too many spaces"',
  },
  {
    id: "os-sys-env",
    topic: "Standard library",
    questions: [
      "How do I read command line arguments?",
      "How do I read an environment variable?",
      "How do I list files in a directory?",
      "How do I use argparse?",
    ],
    keywords: [
      "sys.argv",
      "argparse",
      "environment",
      "os.environ",
      "listdir",
      "command line",
      "cli",
    ],
    answer:
      'sys.argv holds raw command-line arguments; argparse turns them into a proper CLI with help text and types. os.environ.get("NAME") reads environment variables without crashing if they are missing. pathlib.Path(".").iterdir() lists a folder.',
    code: 'import argparse, os\nfrom pathlib import Path\n\nparser = argparse.ArgumentParser(description="Greet someone")\nparser.add_argument("name")\nparser.add_argument("--times", type=int, default=1)\nargs = parser.parse_args()\n\napi_key = os.environ.get("API_KEY")\nfiles = [p.name for p in Path(".").iterdir()]',
  },
  {
    id: "logging",
    topic: "Testing and debugging",
    questions: ["How do I use logging instead of print?", "How do I set up logging in Python?"],
    keywords: ["logging", "log", "debug", "info", "warning", "logger"],
    answer:
      "logging gives you levels (DEBUG, INFO, WARNING, ERROR), timestamps and output you can switch on or off without deleting print calls. Configure it once at startup and get a named logger in each module.",
    code: 'import logging\n\nlogging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")\nlog = logging.getLogger(__name__)\n\nlog.info("starting")\nlog.warning("disk at %d%%", 91)',
  },
  {
    id: "timing-code",
    topic: "Performance",
    questions: [
      "How do I sleep in Python?",
      "How do I measure how long code takes?",
      "How do I pause a program for a few seconds?",
      "How do I use timeit?",
    ],
    keywords: ["time", "timeit", "sleep", "perf_counter", "measure", "benchmark", "pause"],
    answer:
      "time.perf_counter() gives a high-resolution clock — subtract two readings to time a block. timeit runs a snippet many times for a fair micro-benchmark. time.sleep(seconds) pauses the current thread.",
    code: 'import time, timeit\n\nstart = time.perf_counter()\nsum(range(1_000_000))\nprint(f"{time.perf_counter() - start:.3f}s")\n\ntimeit.timeit("sorted(range(1000))", number=1000)\ntime.sleep(1.5)',
  },
  {
    id: "sqlite",
    topic: "Working with data",
    questions: [
      "How do I use a database in Python?",
      "How do I use sqlite3?",
      "How do I avoid SQL injection in Python?",
    ],
    keywords: ["sqlite", "sqlite3", "database", "sql", "query", "injection"],
    answer:
      "sqlite3 ships with Python and stores a whole database in one file. Always pass values as parameters (? placeholders) rather than formatting them into the SQL string — that prevents SQL injection. Using the connection as a context manager commits on success.",
    code: 'import sqlite3\n\nwith sqlite3.connect("app.db") as db:\n    db.execute("CREATE TABLE IF NOT EXISTS users (name TEXT, age INT)")\n    db.execute("INSERT INTO users VALUES (?, ?)", ("Ada", 36))\n    rows = db.execute("SELECT name FROM users WHERE age > ?", (30,)).fetchall()',
  },
  // ---------- Ecosystem ----------
  {
    id: "pandas-basics",
    topic: "Data science",
    questions: [
      "What is pandas?",
      "How do I read a CSV with pandas?",
      "How do I filter rows in a DataFrame?",
    ],
    keywords: ["pandas", "dataframe", "csv", "series", "groupby", "data analysis"],
    answer:
      "pandas is the go-to library for tabular data. A DataFrame is a table of labelled columns. Load files with read_csv, filter with boolean masks, aggregate with groupby, and inspect with head(), info() and describe().",
    code: 'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\ndf.head()\nbig = df[df["amount"] > 100]\ndf.groupby("region")["amount"].sum().sort_values(ascending=False)',
  },
  {
    id: "numpy-basics",
    topic: "Data science",
    questions: [
      "What is NumPy?",
      "Why is NumPy faster than lists?",
      "How do I create a NumPy array?",
    ],
    keywords: ["numpy", "array", "vectorize", "matrix", "ndarray"],
    answer:
      "NumPy provides fast fixed-type arrays and vectorised maths implemented in C. Operations apply to whole arrays at once, which avoids slow Python loops and is the foundation of pandas, scikit-learn and most scientific Python.",
    code: "import numpy as np\n\na = np.array([1, 2, 3])\na * 2                 # array([2, 4, 6])\nnp.arange(6).reshape(2, 3)\nnp.random.default_rng(0).normal(size=3)\na.mean(), a.std()",
  },
  {
    id: "matplotlib-basics",
    topic: "Data science",
    questions: ["How do I make a chart in Python?", "How do I plot a graph with matplotlib?"],
    keywords: ["matplotlib", "plot", "chart", "graph", "visualize", "pyplot"],
    answer:
      "matplotlib.pyplot draws line, bar, scatter and histogram charts. Create a figure and axes, plot onto the axes, label them, then show() or savefig().",
    code: 'import matplotlib.pyplot as plt\n\nfig, ax = plt.subplots()\nax.plot([1, 2, 3, 4], [1, 4, 9, 16], marker="o")\nax.set(title="Squares", xlabel="n", ylabel="n²")\nfig.savefig("squares.png")\nplt.show()',
  },
  {
    id: "flask-api",
    topic: "Web development",
    questions: [
      "How do I build a web API in Python?",
      "How do I create a simple Flask app?",
      "What is FastAPI?",
    ],
    keywords: ["flask", "fastapi", "api", "web", "server", "endpoint", "route"],
    answer:
      "Flask and FastAPI both let you map URLs to Python functions. FastAPI uses type hints for validation and auto-generated docs; Flask is minimal and flexible. Install with pip, define a route, and run the development server.",
    code: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/hello/{name}")\ndef hello(name: str):\n    return {"message": f"Hello {name}"}\n\n# run: uvicorn main:app --reload',
  },
  {
    id: "web-scraping",
    topic: "Web development",
    questions: ["How do I scrape a website with Python?", "What is BeautifulSoup?"],
    keywords: ["scrape", "scraping", "beautifulsoup", "bs4", "html", "parse"],
    answer:
      "Fetch the page with requests and parse the HTML with BeautifulSoup, then select elements with CSS selectors. Check the site's terms and robots.txt, add delays between requests, and prefer an official API when one exists.",
    code: 'import requests\nfrom bs4 import BeautifulSoup\n\nhtml = requests.get("https://example.com", timeout=10).text\nsoup = BeautifulSoup(html, "html.parser")\ntitles = [h.get_text(strip=True) for h in soup.select("h1, h2")]',
  },
  {
    id: "pickle-serialize",
    topic: "File handling",
    questions: ["How do I save a Python object to a file?", "What is pickle?", "Is pickle safe?"],
    keywords: ["pickle", "serialize", "save object", "dump", "load"],
    answer:
      "pickle serialises almost any Python object to bytes so you can save it and load it later. Only unpickle data you trust — loading a malicious pickle can run arbitrary code. For data you share, prefer JSON or CSV.",
    code: 'import pickle\n\nwith open("model.pkl", "wb") as f:\n    pickle.dump({"weights": [0.1, 0.2]}, f)\n\nwith open("model.pkl", "rb") as f:\n    obj = pickle.load(f)',
  },
  {
    id: "generator-expression",
    topic: "Comprehensions",
    questions: [
      "What is a generator expression?",
      "What is the difference between a list comprehension and a generator expression?",
      "How do I write a dictionary comprehension?",
      "What is a set comprehension?",
    ],
    keywords: ["generator expression", "lazy", "memory", "dict comprehension", "set comprehension"],
    answer:
      "Square brackets build a list immediately; round brackets build a generator that yields items lazily, using almost no memory. Curly braces with key: value build a dict, and curly braces with a single expression build a set.",
    code: "squares_list = [n * n for n in range(10)]\nsquares_gen = (n * n for n in range(10_000_000))  # lazy\nsum(n * n for n in range(10))\n{n: n * n for n in range(4)}     # {0: 0, 1: 1, 2: 4, 3: 9}\n{len(w) for w in ['hi', 'yo', 'hey']}  # {2, 3}",
  },
  {
    id: "while-break-continue",
    topic: "Loops",
    questions: [
      "How does a while loop work?",
      "What do break and continue do?",
      "How do I stop an infinite loop?",
      "What does pass do?",
    ],
    keywords: ["while", "break", "continue", "pass", "infinite", "loop"],
    answer:
      "A while loop repeats as long as its condition is true. break exits the loop immediately, continue skips to the next iteration, and pass is a placeholder that does nothing. Press Ctrl+C in the terminal to stop a runaway infinite loop.",
    code: "n = 0\nwhile True:\n    n += 1\n    if n % 2:\n        continue   # skip odd numbers\n    if n > 8:\n        break\n    print(n)       # 2 4 6 8",
  },
];
