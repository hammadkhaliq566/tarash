function sendMail() {
    
    const products = JSON.parse(localStorage.getItem('products'));
    
    
    let subtotal = 0;
    products.forEach(product => {
        subtotal += parseInt(product.price.replace(',', '')) * parseInt(product.quantity);
    });

    
    const deliveryFee = 500;
    const total = subtotal + deliveryFee;
// https://1eaa-2400-adc5-154-f400-a4ae-e371-8e17-fb5f.ngrok-free.app 

    let productList = '';
    products.forEach(product => {
        const proPrice = parseInt(product.price.replace(/,/g, ''));
        const proTotal = product.quantity*proPrice;
        const imageName = product.image.substring(product.image.lastIndexOf('/') + 1);
        productList += `
            <br>
            <b>Product Name:</b> ${product.name}<br>
            <b>Product Image:</b>/images/${imageName}<br>
            <b>Quantity:</b> ${product.quantity}<br>
            <b>Price per Unit:</b> PKR ${product.price}<br>
            <b>Total price:</b> ${product.quantity} x PKR ${product.price} = ${proTotal.toLocaleString()}<br>
            ---------------------
        `;
        
    });

    
    const params = {
        subject: 'New Order from ' + sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName'),
        to_name: 'Taraash Online', 
        message: `
            <h3><b>New Order from ${sessionStorage.getItem('firstName')}</b></h3><br><br>
            <b>First Name:</b> ${sessionStorage.getItem('firstName')}<br>
            <b>Last Name:</b> ${sessionStorage.getItem('lastName')}<br>
            <b>Email Address:</b> ${sessionStorage.getItem('email')}<br>
            <b>Street Address Line 1:</b> ${sessionStorage.getItem('address1')}<br>
            <b>Street Address Line 2:</b> ${sessionStorage.getItem('address2') || 'N/A'}<br>
            <b>City:</b> ${sessionStorage.getItem('city')}<br>
            <b>Postal Code:</b> ${sessionStorage.getItem('postalCode')}<br>
            <b>Phone Number:</b> ${sessionStorage.getItem('phoneNumber')}<br>
            <br> 
            <h3><b>Orders:</b></h3> 
            ${productList}

            <br>
            <b>Subtotal:</b> ${subtotal.toLocaleString()}<br>
            <b>Delivery Fee:</b> ${deliveryFee}<br>
            <b>Total:</b> ${total.toLocaleString()}<br>
        `
    };


fetch('http://localhost:3020/api/user/sendMail', {
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



