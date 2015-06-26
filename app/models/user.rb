class User < ActiveRecord::Base
	has_secure_password

    has_many :scores

    validates :name, presence: true
   
    validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }

    validates :password, presence: true, length: { in: 6..10 }, confirmation: true

  attr_reader :password #add this line right below our list of fields

end
