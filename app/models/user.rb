class User < ActiveRecord::Base
  acts_as_jwt_authenticatable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable

  enum role: {member: 0, admin: 1}

  mount_uploader :avatar, AvatarUploader

  has_many :posts
  has_many :comments
end
