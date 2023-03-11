import { sequelize } from '../utils/db.js'
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	login: {
		type: DataTypes.STRING, unique: true,
	},
	password: {
		type: DataTypes.STRING
	},
	role: {
		type: DataTypes.STRING, defaultValue: "USER"
	},
	activationLink: {
		type: DataTypes.STRING
	},
	isActivation: {
		type: DataTypes.BOOLEAN, defaultValue: false
	}
})
const Product = sequelize.define('product', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	price: {
		type: DataTypes.FLOAT(10, 2), allowNull: false
	},
	name: {
		type: DataTypes.STRING, allowNull: false
	},
	description: {
		type: DataTypes.STRING, allowNull: false
	},
	discountPercentage: {
		type: DataTypes.INTEGER, defaultValue: 0
	},
	count: {
		type: DataTypes.INTEGER, allowNull: false
	},
	garanitiya: {
		type: DataTypes.INTEGER, defaultValue: 2
	},
	rating: {
		type: DataTypes.FLOAT(10, 1), defaultValue: 0
	},
	img: {
		type: DataTypes.JSON                //allowNull - запрещает 0(пустым)
	},
	imgMini: {
		type: DataTypes.JSON
	},
	new: {
		type: DataTypes.BOOLEAN, defaultValue: false
	},
	ucenka: {
		type: DataTypes.BOOLEAN, defaultValue: false
	},
	stock: {
		type: DataTypes.BOOLEAN, defaultValue: false
	},
	hit: {
		type: DataTypes.BOOLEAN, defaultValue: false
	},
	typeId: {
		type: DataTypes.INTEGER, allowNull: false
	},
	categoryId: {
		type: DataTypes.INTEGER, allowNull: false
	},

})
const Category = sequelize.define('category', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	name: {
		type: DataTypes.STRING
	},
	link: {
		type: DataTypes.STRING
	},
})

const Rating = sequelize.define('rating', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	rate: {
		type: DataTypes.STRING
	},
	text: {
		type: DataTypes.STRING
	},
})
const InfoPages = sequelize.define('infoPages', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	link: {
		type: DataTypes.STRING, allowNull: false
	},
	title: {
		type: DataTypes.STRING, allowNull: false
	},
	content: {
		type: DataTypes.TEXT('long'), allowNull: false
	},
})

const Type = sequelize.define('type', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	name: {
		type: DataTypes.STRING
	},
	link: {
		type: DataTypes.STRING
	},

})
const InfoTitle = sequelize.define('infoTitle', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	name: {
		type: DataTypes.STRING
	},
})

const Info = sequelize.define('info', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	name: {
		type: DataTypes.STRING, allowNull: false
	},
	content: {
		type: DataTypes.JSON
	},
})
const ProductInfo = sequelize.define('productinfo', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	title: {
		type: DataTypes.STRING, allowNull: false
	},
	description: {
		type: DataTypes.STRING, allowNull: false
	},
	description: {
		type: DataTypes.STRING, allowNull: false
	},
	titleInfoId: {
		type: DataTypes.FLOAT, defaultValue: 0
	}
})

const Feedback = sequelize.define('feedback', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	name: {
		type: DataTypes.STRING, allowNull: false
	},
	contact: {
		type: DataTypes.STRING, allowNull: false
	},
	description: {
		type: DataTypes.TEXT('long'), allowNull: false
	},
	plus: {
		type: DataTypes.STRING, allowNull: false
	},
	minus: {
		type: DataTypes.STRING, allowNull: false
	}
})

const QuestionResponse = sequelize.define('questions_response', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	name: {
		type: DataTypes.STRING, allowNull: false
	},
	contact: {
		type: DataTypes.STRING, allowNull: false
	},
	question: {
		type: DataTypes.TEXT('long'), allowNull: false
	},
	response: {
		type: DataTypes.TEXT('long')
	},
	prochitano: {
		type: DataTypes.BOOLEAN, defaultValue: false
	},
	publication: {
		type: DataTypes.BOOLEAN, defaultValue: false
	}
})

//---------------
const ContentPage = sequelize.define('content_page', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	content: {
		type: DataTypes.TEXT('long')
	},
	h2: {
		type: DataTypes.STRING
	},
	contentH2: {
		type: DataTypes.TEXT('long')
	},
	imgH2: {
		type: DataTypes.JSON
	},
	h3: {
		type: DataTypes.STRING
	},
	contentH3: {
		type: DataTypes.TEXT('long')
	},
	imgH3: {
		type: DataTypes.JSON
	},
})

//-----------------
const StocksPage = sequelize.define('stock_page', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	date1: {
		type: DataTypes.STRING
	},
	date2: {
		type: DataTypes.STRING
	},
	title: {
		type: DataTypes.STRING
	},
	img: {
		type: DataTypes.JSON
	},
	text: {
		type: DataTypes.STRING
	},
	status: {
		type: DataTypes.BOOLEAN, defaultValue: false
	},
})

//----------------------
const SliderImg = sequelize.define('sliderImg', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	img: { type: DataTypes.STRING, allowNull: false },
})


const BannerImgPage = sequelize.define('banner_img_page', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	img: { type: DataTypes.STRING, allowNull: false },
})


const CategoryProduct = sequelize.define('category_product', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const TypeProduct = sequelize.define('type_product', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const CategoryType = sequelize.define('category_type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})



// ------------------------------------------
const Basket = sequelize.define('basket', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
})

const BasketProduct = sequelize.define('basket_products', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	inStock: {
		type: DataTypes.BOOLEAN, allowNull: false
	},
	count: {
		type: DataTypes.INTEGER, defaultValue: 1
	},
})

// -----------------------
const UserData = sequelize.define('user_data', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	fitstName: {
		type: DataTypes.STRING, allowNull: false
	},
	lastName: {
		type: DataTypes.STRING
	},
	otchestvo: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING, allowNull: false
	},
	dateBirth: {
		type: DataTypes.STRING, defaultValue: '-'
	},
	phone: {
		type: DataTypes.JSON, allowNull: false
	},
	address: {
		type: DataTypes.JSON, allowNull: false
	},
	city: {
		type: DataTypes.JSON, allowNull: false
	},
})

const BasketOrder = sequelize.define('basket_order', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	count: {
		type: DataTypes.INTEGER, allowNull: false
	},
	price: {
		type: DataTypes.FLOAT(10, 2), allowNull: false
	},
	productId: {
		type: DataTypes.INTEGER
	},
	status: {
		type: DataTypes.BOOLEAN, defaultValue: false
	}
})

const Order = sequelize.define('order', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
	userId: {
		type: DataTypes.INTEGER, allowNull: false
	},
	delivery: {
		type: DataTypes.STRING, allowNull: false
	},
	city: {
		type: DataTypes.STRING, allowNull: false
	},
	address: {
		type: DataTypes.STRING, allowNull: false
	},
	oplata: {
		type: DataTypes.STRING, allowNull: false
	},
	phone: {
		type: DataTypes.STRING, allowNull: false
	},
	comment: {
		type: DataTypes.STRING, allowNull: false
	},
	date: {
		type: DataTypes.STRING, allowNull: false
	},
	time: {
		type: DataTypes.STRING, allowNull: false
	}
})
// ------------------------------------------
const Group = sequelize.define('group', {
	id: {
		type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
	},
})


Group.hasMany(Product)
Product.belongsTo(Group)

Order.hasMany(BasketOrder)
BasketOrder.belongsTo(Order)

Product.hasMany(BasketOrder)
BasketOrder.belongsTo(Product)

Order.belongsTo(User)

BasketOrder.belongsTo(Basket)

User.hasOne(UserData)
UserData.belongsTo(User)
//----------------
Product.hasOne(ContentPage)
ContentPage.belongsTo(Product)

Category.hasOne(ContentPage)
ContentPage.belongsTo(Category)

Type.hasOne(ContentPage)
ContentPage.belongsTo(Type)

// -----------------------------------------
User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Product.hasMany(BasketProduct) //, {onDelete: 'cascade'}
BasketProduct.belongsTo(Product) //, {onDelete: 'restrict'}
// -------------------------------------------
Product.hasMany(QuestionResponse)
QuestionResponse.belongsTo(Product)


Category.hasOne(BannerImgPage)
BannerImgPage.belongsTo(Category)
Type.hasOne(BannerImgPage)
BannerImgPage.belongsTo(Type)



User.hasMany(Rating)
Rating.belongsTo(User)




User.hasMany(Feedback)
Feedback.belongsTo(User)

Product.hasMany(Feedback)
Feedback.belongsTo(Product)


Rating.hasMany(Feedback)
Feedback.belongsTo(Rating)

InfoTitle.hasMany(Info)
Info.belongsTo(InfoTitle)


Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.belongsToMany(Category, { through: CategoryProduct })
Category.belongsToMany(Product, { through: CategoryProduct })

Product.belongsToMany(Type, { through: TypeProduct })
Type.belongsToMany(Product, { through: TypeProduct })

Category.belongsToMany(Type, { through: CategoryType })
Type.belongsToMany(Category, { through: CategoryType })

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)



export const models = {
	User,
	UserData,
	Product,
	Category,
	SliderImg,
	Rating,
	Type,
	Feedback,
	CategoryType,
	CategoryProduct,
	TypeProduct,
	ProductInfo,
	Info,
	InfoTitle,
	Basket,
	BasketOrder,
	Order,
	BasketProduct,
	Group,
	InfoPages,
	QuestionResponse,
	ContentPage,
	StocksPage,
	BannerImgPage,
}

