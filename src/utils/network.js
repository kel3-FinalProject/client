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
    
    if (response.status === 404) {
      console.error("Data not found:", response.status);
      return { error: true, code: response.status, data: null };
    }

    if (!response.ok) {
      console.error("Error fetching kamar data:", response.status);
      return { error: true, code: response.status, data: null };
    }

    const responseJson = await response.json();
    console.log("Response from server:", responseJson);
    return responseJson;
  } catch (error) {
    console.error("Unexpected error during getKamarById:", error);
    return { error: true, code: 500, data: null };
  }
}

async function updateKamar(id, nameKamar, harga, size, description, kapasitas, Class, file, fasilitas) {
  try {
    const formData = new FormData();
    formData.append("nameKamar", nameKamar);
    formData.append("harga", harga);
    formData.append("description", description);
    formData.append("size", size);
    formData.append("Class", Class); 
    formData.append("kapasitas", kapasitas);
    formData.append("tipe", Class); 
    formData.append("fasilitas", fasilitas);

    if (file) {
      formData.append("file", file);
    }

    const response = await fetchWithToken(`${BASE_URL}/kamar/${id}`, {
      method: "PUT",
      body: formData,
    });

    const responseJson = await response.json();

    if (response.status >= 400) {
      console.error("Error updating kamar:", response.status, responseJson);
      return { error: true, code: response.status, data: null };
    }

    return { error: false, code: response.status, data: responseJson.data };
  } catch (error) {
    console.error("Kesalahan yang tidak terduga selama updateKamar:", error);
    return { error: true, code: 500, data: null };
  }
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
