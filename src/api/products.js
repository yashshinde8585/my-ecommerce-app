const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products?offset=0&limit=20`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return []; // Return empty array on error
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error('Could not find product');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch product ${id}:`, error);
        return null;
    }
}

export const fetchProductsByTitle = async (title) => {
    try {
        const response = await fetch(`${BASE_URL}/products/?title=${title}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch products with title ${title}:`, error);
        return [];
    }
};