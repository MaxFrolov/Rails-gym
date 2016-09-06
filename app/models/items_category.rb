class ItemsCategory < ActiveRecord::Base
  belongs_to :target, :polymorphic => true
  belongs_to :category
end
