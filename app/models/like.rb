class Like < ActiveRecord::Base
  TARGETS = %w(Post Food Product Event Comment Gallery Exercise)
  belongs_to :user
  belongs_to :target, polymorphic: true, inverse_of: :likes, counter_cache: true

  with_options on: :create do |item|
    item.validates :target, presence: true
    item.validate :validate_target_uniqueness, if: 'errors.empty?'
  end


  # http://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html
  # section Polymorphic Associations
  def target_type=(class_name)
    super(class_name.camelize.constantize.base_class.to_s)
  end

  def validate_target_uniqueness
    errors.add(:target, :already_liked) if self.class.where(target: target, user_id: user_id).exists?
  end
end
