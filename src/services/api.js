import http from './usrati';

/**
 * User login
 * @returns {Promise<T | never>}
 */
export function login(payload) {
  console.log('🚀 ~ file: api.js ~ line 8 ~ login ~ payload', payload);
  return new Promise((resolve, reject) => {
    http
      .post('user/auth/login', payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * User Signup
 * @returns {Promise<T | never>}
 */
export function createUser(payload) {
  return new Promise((resolve, reject) => {
    http
      .post('user', payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error?.response?.data ?? 'Something went wrong!');
      });
  });
}

/**
 * Create parent user
 * @returns {Promise<T | never>}
 */
export function createParent(payload) {
  return new Promise((resolve, reject) => {
    http
      .post('parent', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: payload.token,
        },
        email: payload.email,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Add family
 * @returns {Promise<T | never>}
 */
export function addFamily(id, payload, action) {
  if (action === 'add') {
    return http
      .post('family', payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  } else {
    return http
      .patch(`family/${id}`, payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}

/**
 * Add guardian user
 * @returns {Promise<T | never>}
 */
export function addNewGuardian(id, payload, flag) {
  if (flag === 'add') {
    return http
      .post('guardian', payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  } else {
    return http
      .patch(`guardian/${id}`, payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export function updateGuardianData(id, payload) {
  return http
    .patch(`parent/${id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function deleteGuardianData(id) {
  return http
    .delete(`parent/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

/**
 * Add child user
 * @returns {Promise<T | never>}
 */
export function addNewChild(payload) {
  return http
    .post('child', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function updateChildData(id, payload) {
  return http
    .patch(`child/${id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function deleteChildData(id) {
  return http
    .delete(`child/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Get all children
 * @returns {Promise<T | never>}
 */
export function getAllChildren({ familyID }) {
  return http
    .get(`family/${familyID}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function addMatric(payload) {
  return http
    .post('category', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function editMatric(id, payload) {
  return http
    .patch(`category/${id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function deleteMatric(id) {
  return http
    .delete(`category/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function getMatrics({ parentID }) {
  return http
    .get(`parent/${parentID}/categories`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function updateMatrics(payload) {
  return http
    .post('category/update', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

// Sub Categories apis
export function addSubMatric(payload) {
  return http
    .post('subcategory', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function taskAssign(payload) {
  return http
    .post('task', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function editSubMatric(id, payload) {
  return http
    .put(`subcategory/${id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function deleteSubMatric(id) {
  return http
    .delete(`subcategory/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function getSubMatrics({ parentCategoryID }) {
  return http
    .get(`category/${parentCategoryID}/subcategories`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function getChildInfo({ childId }) {
  return http
    .get(`child/${childId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function updateSubMatrics(payload) {
  return http
    .post('subcategory/update', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}
