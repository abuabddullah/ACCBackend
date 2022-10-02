Populate কি?

> > আমাদের কাছে Product,Brand এর জন্য আলাদা আলাদা model আছে। এবং আমরা যখন কোন নতুন product যেমন **Fresh Chinigura Chal** কে frontend থেকে **_post_** করব তখন save করার সময় **Fresh** brand এর যেই identity আছে **[name,id]** তা **productModel** এ keep করে রাখব যাতে সহজেই কোন brand তা জানতে পারি[**emabded** করে রাখব] আর সেই brand এর কোন বিস্তারিত information যদি লাগে তাও নিতে পারি[**ref করে রাখব**]।
>
> > আবার একই সাথে প্রতিবার আলাদা আলাদা product **_post_** করব তখন সেই product এর যেই identity আছে **[id]** তা **brandModel** এ keep করে রাখব যাতে সহজেই কোন brand তার বিস্তারিত information যদি লাগে তাও নিতে পারি[**ref করে রাখব**]
