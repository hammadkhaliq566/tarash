function sendCustomerEmail() {
    
    const products = JSON.parse(localStorage.getItem('products'));
    
    
    let subtotal = 0;
    products.forEach(product => {
        subtotal += parseInt(product.price.replace(',', '')) * parseInt(product.quantity);
    });

    
    const deliveryFee = 500;
    const total = subtotal + deliveryFee;

    
    let productList = '';
    products.forEach(product => {
        const proPrice = parseInt(product.price.replace(/,/g, ''));
        const proTotal = product.quantity*proPrice;
        productList += `
        <br>
        <b>Product Name:</b> ${product.name}<br> 
        <b>Quantity:</b> ${product.quantity}<br>
        <b>Price per Unit:</b> PKR ${product.price}<br>
        <b>Total price:</b> ${product.quantity} x PKR ${product.price} = ${proTotal.toLocaleString()}<br>
        ---------------------
        `;
    });

    const date = new Date();
    currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    
    const params = {  
        subject: 'Your Order Confirmation',
        to: sessionStorage.getItem('email'), 
        order_date: currentDate,
        message: ` 
        <p>Dear ${sessionStorage.getItem('firstName')},</p><br><br>

        <p style="color: black">Thank you for your order! 
        We're excited to let you know that your order has been successfully placed. 
        
        Below are the details of your purchase:
        </p><br>
        <h3><b>Items Ordered:</b> </h3>
        <h6>Date: ${currentDate}</h6><br><br>
            ${productList}

            <br>
            <b>Subtotal:</b> ${subtotal.toLocaleString()}<br>
            <b>Delivery Fee:</b> ${deliveryFee}<br>
            <b>Total:</b> ${total.toLocaleString()}<br><br>


            <b>Shipping Address: </b><br>
            <b>Street Address Line 1:</b> ${sessionStorage.getItem('address1')}<br>
            <b>Street Address Line 2:</b> ${sessionStorage.getItem('address2') || 'N/A'}<br>
            <b>City:</b> ${sessionStorage.getItem('city')}<br>
            <b>Postal Code:</b> ${sessionStorage.getItem('postalCode')} <br><br>

            <p>Please note that your order will be processed and shipped soon. You will receive another email with the tracking information once your order has been dispatched.
                If you have any questions or concerns about your order, feel free to reply to this email or contact our customer support team at taraashonline@gmail.com. 
                
                Thank you for shopping with us!
                
                Best regards,
                Taraash</p>
            
        `
    };

    fetch('http://localhost:3020/api/user/sendCustomerMail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(response => {
        if (response.ok) {
            console.log('Email sent successfully'); 
        } else {
            console.error('Failed to send email');
        }
    }).catch(error => {
        console.error('Error sending email:', error);
    });
 
}



