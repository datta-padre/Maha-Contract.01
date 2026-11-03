CREATE TABLE about_company(
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_mobile VARCHAR(15),
    company_email VARCHAR(255),
    company_whatsapp VARCHAR(15),
    instagram TEXT,
    youtube TEXT,
    facebook TEXT,
    twitter TEXT,
    linkedin TEXT,
    company_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);