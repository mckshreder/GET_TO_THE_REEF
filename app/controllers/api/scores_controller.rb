module API
  class ScoresController < ApplicationController

    def index
      render json: Score.all
      # render json: User.all
    end
  end
end

