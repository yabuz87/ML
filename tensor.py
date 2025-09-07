import tensorflow as tf

# Step 1: Create a tensor with values from 1 to 24.
tensorX = tf.range(1, 25)  

# Step 2: Reshape tensorX into a 3D tensor of shape [2, 3, 4].
tensorX = tf.reshape(tensorX, [2, 3, 4])

# Step 3: Transpose tensorX by swapping the 2nd and 3rd dimensions.
tensorY = tf.transpose(tensorX, perm=[0, 2, 1])

# Step 4: Reshape tensorY into a 2D tensor with 4 rows. Let TensorFlow determine the number of columns.
tensorZ = tf.reshape(tensorY, [4, -1])

print("tensorX:\n", tensorX.numpy())
print("tensorY:\n", tensorY.numpy())
print("tensorZ:\n", tensorZ.numpy())
