import tensorflow as tf

tensor1=tf.ones([1,2,3])
print(tensor1)
tensor2=tf.reshape(tensor1,[2,3,1])
print(tensor2)
tensor3=tf.reshape(tensor2,[3,-1])
print(tensor3)