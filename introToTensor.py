import tensorflow as tf

tensor1=tf.ones([1,2,3])
print(tensor1)
tensor2=tf.reshape(tensor1,[2,3,1])
print(tensor2)
tensor3=tf.reshape(tensor2,[3,-1])
print(tensor3)
# there are different types of tensor
# variable
# constant
# placeholder
# sparseTensor
# all the aboves are types of tensor from those all are immutable except variable 
# immutable means constant(unchaged once it's written)
# and variable is mutable
