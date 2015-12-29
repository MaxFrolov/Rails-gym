class Comment < ActiveRecord::Base
  validates :name, :message, :email, presence: true
  validates_format_of :email, with: /\A[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+\z/, allow_blank: false

  belongs_to :user
  belongs_to :post
  belongs_to :food
end
