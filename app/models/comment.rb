class Comment < ActiveRecord::Base
  TARGETS = %w(Post Food Product Event)

  validates :name, :message, :email, presence: true
  validates_format_of :email, with: /\A[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+\z/, allow_blank: false

  def target_type=(class_name)
    super(class_name.camelize.constantize.base_class.to_s)
  end

  belongs_to :user
  belongs_to :target, polymorphic: true, inverse_of: :comments, counter_cache: true
  has_many :likes, as: :target, inverse_of: :comments, dependent: :delete_all
end
