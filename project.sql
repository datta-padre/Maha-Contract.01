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

CREATE TABLE contact_messages (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    countryCode VARCHAR(10) DEFAULT '+91',
    phone VARCHAR(20) NOT NULL,
    topic VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);