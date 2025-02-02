import tensorflow as tf
tensor1=tf.ones([1,2,3])
# print(tensor1)
tensor2=tf.reshape(tensor1,[2,3,1])
# print(tensor2)
tensor3=tf.reshape(tensor2,[3,-1])
tensor4=tf.zeros([5,5,5,5])
#print(tensor4) # this one is insane
#to make this tensor written in one dimension you can shape it using reshaping function 
tensor5=tf.reshape(tensor4,[625])
# print(tensor5)


# print(tensor3)
# there are different types of tensor
# variable
# constant
# placeholder
# sparseTensor
# all the aboves are types of tensor from those all are immutable except variable 
# immutable means constant(unchaged once it's written)
# and variable is mutable
# evaluating tensors
# it means getting the the tensor's value since tensor represents a partially complete computations we will sometimes need to run what's called a session to evaluate the tensor
# thee are many different wats to achieve this but i will note this simplest way below.
# with tf.Session() as sess    // creates a session using the default graph
# tensor.eval() // tensor will of course be then name of your tensor