CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    quantity INT DEFAULT 0,
    threshold INT NOT NULL,
    cost_price DECIMAL(10,2) NOT NULL,
    supplier_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reorders (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    quantity_ordered INT NOT NULL,
    supplier_name VARCHAR(100) NOT NULL,
    status VARCHAR(30) DEFAULT 'Processing',
    otp VARCHAR(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);