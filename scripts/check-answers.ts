// Self-check for the matcher: `npm run check:answers`. Fails if a known question routes to the wrong entry.
import assert from "node:assert/strict";

import { answerQuestion } from "../src/lib/answer";
import { reply, type Turn } from "../src/lib/chat";
import { knowledgeBase } from "../src/lib/knowledge-base";

const cases: [string, string][] = [
  ["how do i reverse a list", "lists-reverse"],
  ["what is a decorator", "decorators"],
  ["how to format a float to 2 decimals", "fstrings-format"],
  ["check if string is palindrome", "reverse-palindrome"],
  ["fibonacci series program", "fibonacci"],
  ["is 17 a prime number how to check", "prime-numbers"],
  ["difference between append and extend", "list-methods"],
  ["sort dict by value", "merge-sort-dicts"],
  ["what is a dataclass", "dataclasses"],
  ["NoneType object has no attribute", "error-attribute"],
  ["ModuleNotFoundError no module named requests", "error-module-not-found"],
  ["how to read json file", "json"],
  ["what is pandas", "pandas-basics"],
  ["what does break do", "while-break-continue"],
  ["what is a dictionry", "dicts"],
  ["classmethod vs staticmethod", "classmethod-staticmethod"],
  ["what is a constructor", "oop"],
];

const ids = new Set<string>();
for (const e of knowledgeBase) {
  assert.ok(!ids.has(e.id), `duplicate id ${e.id}`);
  ids.add(e.id);
}

// First questions are shown as suggestion buttons keyed by text, so they must be unique.
const firsts = knowledgeBase.map((e) => e.questions[0]);
assert.equal(new Set(firsts).size, firsts.length, "duplicate first question");

// Every stored phrasing must be answered by an entry that lists it (some phrasings live in two entries).
for (const e of knowledgeBase) {
  for (const q of e.questions) {
    const a = answerQuestion(q);
    const owner = knowledgeBase.find((x) => x.id === a.entryId);
    assert.ok(
      owner?.questions.includes(q),
      `stored question "${q}" answered by ${a.entryId ?? "fallback"}`,
    );
  }
}

// Common beginner questions phrased differently from the stored ones: all must get an answer.
const common = `what is python
who are you
what can you do
hello
what is a variable
how to print in python
how to take input from user
convert string to int
how to make a list
add element to list
remove last element from list
length of a list
sort a list descending
what is a tuple
difference between list and tuple
what is a dictionary
loop through dictionary
check if key exists in dict
what is a set
if else in python
for loop example
while loop
what is range
how to define a function
what is return
what is lambda
what are args and kwargs
what is a class
what is self
what is inheritance
what is polymorphism
what is encapsulation
how to import a module
how to install a package
what is pip
try except example
how to raise an exception
how to open a file
write to a file
read csv file
what is list comprehension
what is a generator
what is yield
what is a decorator
what is recursion
what is the GIL
how to use async await
how to make http request
what is json
how to get current date
what is regex
string to uppercase
check if string contains substring
replace text in string
how to format strings
what is None
what is a virtual environment
how to debug python code
how to write unit tests
what is pep8
type hints in python
what is __name__ == main
global variable
how to copy a list
deep copy vs shallow copy
what is mutable and immutable
what is an iterator
what is zip
what is enumerate
how to swap two numbers
factorial program
fibonacci
prime number check
reverse a string
palindrome
max of list
sum of list
count occurrences
what is map function
filter function
sorted vs sort
what is slicing
negative indexing
what is a module
what is a package
what is __init__.py
how to check if item in list
last element of list
how to stop a program
what is a linked list
time complexity of list lookup
what is pandas
what is numpy
how to plot graph
what is flask
what is django
how to read environment variables
command line arguments
how to exit a program
what is assert
what is pass
break vs continue
what is the walrus operator
what is f string
python vs java
is python compiled or interpreted
what is pickle
what is a lambda function
how to measure time
sleep in python
random number
what is math module
round a number
floor division
what is modulo
what is bool
truthy falsy
what is is vs ==
what is IndexError
KeyError
TypeError
how to fix indentation error
what is a stack
what is a queue
binary search
bubble sort
what is big o
what is oop
what is abstraction
what is a static method
what is a property
what is an enum
what is a dataclass
how to merge lists
flatten list
remove duplicates
what is a counter
what is defaultdict
string methods
split a string
join a list
what is a docstring
how to comment
what is indentation
data types in python
can only concatenate str not int
print on same line
make a gui
priority queue
random choice from list
run shell command
class variable vs instance variable
machine learning in python
make a game
2d list
requirements file`.split("\n");
const unanswered = common.filter((q) => !answerQuestion(q).matched);
assert.deepEqual(unanswered, [], "common questions without an answer");

let failed = 0;
for (const [q, id] of cases) {
  const a = answerQuestion(q);
  if (a.entryId !== id) {
    failed += 1;
    console.log(`FAIL "${q}" -> ${a.entryId ?? "fallback"} (${a.confidence}), expected ${id}`);
  }
}
for (const q of [
  "weather in paris tomorrow",
  "weather in paris",
  "who won the world cup",
  "best pizza in rome",
  "how to cook rice",
]) {
  assert.equal(answerQuestion(q).matched, false, `off-topic "${q}" should fall back`);
}

const t = performance.now();
for (let i = 0; i < 200; i += 1) answerQuestion("how do i handle exceptions in python");
console.log(
  `${knowledgeBase.length} entries, avg ${((performance.now() - t) / 200).toFixed(2)}ms per answer`,
);
assert.equal(failed, 0, `${failed} routing failures`);

// Conversation layer: small talk, follow-ups that use the previous turn, two questions at once.
const turn = (q: string): Turn => ({ question: q, answer: answerQuestion(q) });
assert.equal(reply("hi")[0]?.topic, "Chat", "greeting");
assert.equal(reply("thanks!")[0]?.topic, "Chat", "thanks");
const ex = reply("show me an example", turn("What is a decorator?"))[0];
assert.ok(
  ex?.entryId === "decorators" && ex.code,
  "example follow-up reuses the previous entry's code",
);
const swap = reply("what about strings?", turn("How do I reverse a list?"))[0];
assert.ok(
  knowledgeBase
    .find((e) => e.id === swap?.entryId)
    ?.questions.includes("How do I reverse a string?"),
  `"what about strings" after reversing a list -> ${swap?.entryId}`,
);
const more = reply("tell me more", turn("What is a decorator?"))[0];
assert.ok(more?.matched && more.entryId !== "decorators", "tell me more moves to a related entry");
const two = reply("what is a list and what is a tuple?");
assert.deepEqual(
  two.map((p) => p.entryId),
  ["lists", "tuples"],
  "two questions in one message",
);
assert.equal(reply("weather in paris")[0]?.matched, false, "off-topic still refused");
console.log("ok");
