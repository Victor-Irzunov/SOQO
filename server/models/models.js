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
	rating: {
		type: DataTypes.INTEGER, defaultValue: 0
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
	typeId: {
		type:DataTypes.INTEGER, allowNull: false
	},
	categoryId: {
		type:DataTypes.INTEGER, allowNull: false
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
		type: DataTypes.STRING, allowNull: false
	},
	plus: {
		type: DataTypes.STRING, allowNull: false
	},
	minus: {
		type: DataTypes.STRING, allowNull: false
	}
})

const SliderImg = sequelize.define('sliderImg', {
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




User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Feedback)
Feedback.belongsTo(User)

Product.hasMany(Feedback)
Feedback.belongsTo(Product)


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
}

