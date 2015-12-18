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
    end
    can [:index, :show], Comment
    can [:index, :show], Post
  end
end
