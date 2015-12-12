class UserSerializer < UserIndexSerializer
  attributes :email, :unconfirmed_email, :role, :birthday,
             :first_name, :last_name, :created_at, :default_address

  def is_confirmed
    object.confirmed?
  end

  def birthday
    object.birthday.strftime('%F') if object.birthday.present?
  end
end
