import axios from "axios"

const createProducts = (params) => {
  var data = JSON.stringify({
    name: params.name,
    productPictures: params.link,
    condition: params.status,
    startPrice: params.priceReserve,
    stepUp: params.price,
    description: params.description,
    time: params.time,
    category: params.category,
    brand: params.brands,
    buyNow: params.sold,
    userId: params.userId
  });

  var config = { 
    method: "post",
    url: "https://auctionapp66.herokuapp.com/api/product/create",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};

const deleteProductbyId = (params) => {
  var data = ({ productID: params.id });
  var config = {
    method: "delete",
    url: "https://aucwebapp.herokuapp.com/products/getProductbyId",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};

const createAuction = (params) => {
  var data = {
    product: params.id,
    userId: params.user
  }
  var config = {
    method: "post",
    url:"https://auctionapp66.herokuapp.com/api/auction/create",
    data: data,
  }
  return axios(config)
}

const getProducts = (params) => {
  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/product/getproductbycategory/" + params.brand + `/?page=${params.currentPage}&limit=${params.limit}`,
  };
  return axios(config)
}

const sortProductByExpiredAt = (params) => {
  var config = {
    method: "get",
    url: `https://auctionapp66.herokuapp.com/api/product/sortproductbyexpiredat/?page=${params.currentPage}&limit=${params.limit}`,
  };
  return axios(config)
}

const getuserbytoken = (params) => {

  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/getuserbytoken/" + params.token,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config);
};

const getProductbyId = (params) => {
  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/product/getproductbyid/" + params.id,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config);
};

const getAuctionByProduct = (params) => {

  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/auction/getauctionbyproduct/" + params.id,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config);
}

const signIn = (params) => {
  var data = { username: params.username, password: params.password };
  var config = {
    method: "post",
    url: "https://auctionapp66.herokuapp.com/api/signin",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};

//dang ky
const signUp = (params) => {
  var data = {
    firstName: params.firstName,
    lastName: params.lastName,
    username: params.userName,
    password: params.password,
    email: params.email,
    contactNumber: params.phone
  }
  var config = {
    method: "post",
    url: "https://auctionapp66.herokuapp.com/api/signup",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};

const signOut = () => {
  var config = {
    method: "post",
    url: "https://auctionapp66.herokuapp.com/api/signout",
  }
  return axios(config)
}

const addressCreate = (params) => {
  var data = {
    mobileNumber: params.phone,
    pinCode: params.code,
    detail: params.address,
    district: params.district,
    city: params.city,
    alternatePhone: params.alphone,
    addressType: params.type,
    userId: params.user,
    price: params.price,
    productId: params.id,
    status: params.status
  }
  var config = {
    method: "post",
    url: "https://auctionapp66.herokuapp.com/api/order/create",
    data: data,
  };
  return axios(config);
}

const getAddress = (params) => {
  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/address/" + params.addressId,
  };
  return axios(config);
}

const getOrder = (params) => {
  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/order/getorderbyuser/" + params.userId,
  };
  return axios(config);
}

const rateUser = (params) => { 
  var data = {
    star: params.star,
    orderId: params.orderId
  }
  var config = {
    method: "patch",
    url: "https://auctionapp66.herokuapp.com/api/order/rateuser",
    data: data
  };
  return axios(config);
}

const checkExpired = () => {
  var config = {
    method: "patch",
    url: "https://auctionapp66.herokuapp.com/api/product/checkexpiredproducts",
  };
  return axios(config);
}

const getAuctionSuccess = (params) => {
  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/auction/getauctionsuccessfullbyuser/" + params.userId,
  };
  return axios(config);
}

const getAuctions = (params) => {
  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/auction/getauctionbyuser/" + params.userId,
  };
  return axios(config);
}
const getProductByUser = (params) => {
  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/product/getproductbyuser/" + params.userId,
  };
  return axios(config);
}

const loginAd = (params) => {
  var data = { username: params.name, password: params.password };
  var config = {
    method: "post",
    url: "https://auctionapp66.herokuapp.com/api/admin/signin",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
}

const getAllProducts = (params) => {
  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/product/getallproducts?page=1&limit=20",
  };
  return axios(config);
}

const getAllUsers = (params) => {
  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/admin/getallusers?page=1&limit=20",
  };
  return axios(config);
}

const getProductsNotValid = () => {
  var config = {
    method: "get",
    url: "https://auctionapp66.herokuapp.com/api/product/getproductnotvalidated",
  };
  return axios(config);
}

const lockUser = (userId) => {
  var data = {
    userId: userId,
  }
  
  var config = {
    method: "patch",
    url: "https://auctionapp66.herokuapp.com/api/admin/lockuser",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
}

const okProduct = (productId) => {
  var data = {
    id: productId,
  }

  var config = {
    method: "patch",
    url: "https://auctionapp66.herokuapp.com/api/product/validateproduct",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
}

export {
  createProducts,
  deleteProductbyId,
  getProducts,
  getProductbyId,
  getAuctionByProduct,
  signIn,
  loginAd,
  signUp,
  signOut,
  sortProductByExpiredAt,
  createAuction,
  getuserbytoken,
  addressCreate,
  getAddress,
  getOrder,
  rateUser,
  checkExpired,
  getAuctionSuccess,
  getAuctions,
  getProductByUser,
  getAllProducts,
  getAllUsers,
  getProductsNotValid,
  lockUser,
  okProduct
}