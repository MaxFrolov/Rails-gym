class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    # Authorized user
    if user.persisted?
      can :index, User
      can [:show, :update, :destroy], User, id: user.id
      can [:create, :update, :destroy], Comment,  user_id: user.id
      can [:create, :update, :destroy], Post,  user_id: user.id
      can [:create, :update, :destroy], Food,  user_id: user.id
      can [:create, :update, :destroy], Event,  user_id: user.id
      can [:create, :update, :destroy], Product,  user_id: user.id

    end

    can [:index, :show], Comment
    can [:index, :show, :recommended_posts], Post
    can [:index, :show, :recommended_foods], Food
    can [:index, :show], Event
    can [:index, :show, :recommended_products], Product
    can [:index, :show, :create, :update], Order
    can [:index, :show, :create, :update], OrderItem
  end
end
