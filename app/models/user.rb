class User < ActiveRecord::Base
  acts_as_jwt_authenticatable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable

  enum role: {member: 0, admin: 1}

  mount_uploader :avatar, Base

  has_many :events
  has_many :posts
  has_many :comments
  has_many :user_advices
  has_many :foods, through: :user_advices
  has_many :training_diaries
  has_many :users_trainings

  def label_for_admin
    [first_name, last_name].join(' ')
  end
end
