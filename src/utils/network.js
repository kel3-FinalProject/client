const BASE_URL = "http://localhost:4003";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

async function deleteAccesToken() {
  localStorage.clear();
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (response.status >= 400) {
    alert(responseJson.msg);
    return { error: true, code: response.status, data: null };
  }

  putAccessToken(responseJson?.token);
  return { error: false, code: response.status, data: responseJson.data };
}

async function register({ name, email, password, confirmPassword }) {
  const response = await fetch(`${BASE_URL}/Register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, confirmPassword }),
  });

  const responseJson = await response.json();

  if (response.status >= 400) {
    alert(responseJson.msg);
    return { error: true, code: response.status };
  }

  return { error: false, code: response.status };
}

async function addKamar(
  nameKamar,
  harga,
  size,
  description,
  kapasitas,
  fasilitas,
  Class,
  file
) {
  const formData = new FormData();
  formData.append("nameKamar", nameKamar);
  formData.append("harga", harga);
  formData.append("size", size);
  formData.append("description", description);
  formData.append("kapasitas", kapasitas);
  formData.append("fasilitas", fasilitas);
  formData.append("Class", Class);
  formData.append("file", file);

  const response = await fetchWithToken(`${BASE_URL}/kamar`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: formData,
  });
  try {
  const responseJson = await response.json();

    if (response.status >= 400) {
      return { error: true, code: response.status, data: null };
    }
    return { error: false, code: response.status, data: responseJson };
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return { error: true, code: 500, data: null };
  }
}

async function getKamar() {
  const response = await fetchWithToken(`${BASE_URL}/kamar`);
  const responseJson = await response.json();
  const formattedData = responseJson.data.map((element) => {
    element.image = `${BASE_URL}/images/${element.image}`;
    console.log("Image URL:", `${element.image}`);
    return element;
  });

  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }
  return { error: false, code: response.status, data: formattedData };
}

async function getKamarById(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/kamar/${id}`);
    const responseData = await response.json();
    console.log("Response Data:", responseData);
    if (!response.ok) {
      console.error(`Error fetching room data for ID ${id}. Response:`, responseData);
      return { error: true, code: response.status, data: null };
    }
    if (responseData.data) {
      const { id, nameKamar, harga, description, fasilitas_array, urlImage } = responseData.data;
      console.log("Fasilitas Array Before:", fasilitas_array);

      // Memastikan fasilitas_array berupa array
      const formattedData = {
        id,
        nameKamar,
        harga,
        description,
        fasilitas_array: Array.isArray(fasilitas_array) ? fasilitas_array : [],
        urlImage: `${urlImage}`, // Sesuaikan ini dengan struktur direktori dan nama file gambar
      };

      console.log("Fasilitas Array After:", formattedData.fasilitas_array);

      return { error: false, code: response.status, data: formattedData };
    } else {
      console.error(`Error fetching room data for ID ${id}. Invalid response:`, responseData);
      return { error: true, code: response.status, data: null };
    }
  } catch (error) {
    console.error(`Error fetching room data for ID ${id}. Internal error:`, error);
    return { error: true, code: 500, data: null };
  }
}


async function updateKamar(id, harga, description, kapasitas, Class, file) {
  const formData = new FormData();
  formData.append("harga", harga);
  formData.append("description", description);
  formData.append("kapasitas", kapasitas);
  formData.append("Class", Class);
  formData.append("file", file);

  const response = await fetchWithToken(`${BASE_URL}/kamar/${id}`, formData, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const responseJson = await response.json();
  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }
  return { error: false, code: response.status, data: responseJson.data };
}

async function deleteKamar(id) {
  const response = await fetchWithToken(`${BASE_URL}/kamar/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }

  return { error: false, code: response.status, data: responseJson.data };
}

export {
  getAccessToken,
  putAccessToken,
  deleteAccesToken,
  login,
  register,
  addKamar,
  getKamar,
  getKamarById,
  updateKamar,
  deleteKamar,
};
