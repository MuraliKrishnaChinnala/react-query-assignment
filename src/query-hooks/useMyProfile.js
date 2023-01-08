import { useQuery } from "@tanstack/react-query";
import React from "react";
import { profileService } from "../API/profile/ProfileService";
import { timezoneService } from "../API/timezone/TimezoneService";
import { QueryKeys } from "../helpers/QueryKeys";

export function useMyProfile() {
  return useQuery({
    queryKey: [QueryKeys.ProfilesGet],
    queryFn: () =>
    profileService
      .getProfiles()
      .then((res) => res.data[0],)
  })
}
