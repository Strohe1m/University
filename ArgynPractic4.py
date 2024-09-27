def foo1():
  data = [34, 'sd', 56, 34.34]
  count = 0
  for itemNum, item in enumerate(data):
      count = count + 1
      
  print(count)

def foo2():
  list = [3.4, 56, "Some", "Hi", 7, 3.8, 44]
  print(list[::3])

def foo3():
   list = [3.4, 56, "Some", "Hi", 7, 3.8, 44]
   print(list[-3])

def foo4():
   tpl = tuple([123, 321, 'some str', 123.2])
   i = 0
   while (i < len(tpl)):
      print(tpl[i])
      i += 1

def foo5():
   some_tpl = (123.2, 31.2, 12, 32, 'ddd', 'sss')
   print(some_tpl)

def foo6():
   hello_world_tpl = ('Hello', ', ', 'World!!!')
   for i in range(len(hello_world_tpl)):
      print(hello_world_tpl[i])

def foo7():
   tup = (3.4, 56, "Some", "Hi", 7, 3.8, 44)
   print(tup[-3])
   print(tup[2::2])

foo7()
