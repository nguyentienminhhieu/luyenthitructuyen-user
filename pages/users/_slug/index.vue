<template>
  <div class="p-10">
    <div class="">
      <AvatarStudent @upload-avatar-clicked="showUploadAvatarModal = true" />
      <InfoPersonStudent @edit-clicked="showEditModal = true" />
      <HistoryUser />
      <ModalEditUser
        :show-modal="showEditModal"
        @close="showEditModal = false"
      />
    </div>
    <ModalUploadAvatar
      :show-modal="showUploadAvatarModal"
      @close="showUploadAvatarModal = false"
    />
  </div>
</template>
<script>
// import HeadingDetailStudent from '~/components/accounts/user/Detail_personal/Heading.vue'
import AvatarStudent from '~/components/accounts/user/Detail_personal/Avatar'
import InfoPersonStudent from '~/components/accounts/user/Detail_personal/InfoPersonal'
import HistoryUser from '~/components/accounts/user/Detail_personal/HistoryUser'
import ModalEditUser from '~/components/accounts/user/ModalEditUser.vue'
import ModalUploadAvatar from '~/components/accounts/user/ModalUploadAvatar.vue'

export default {
  name: 'DetailUser',
  components: {
    // HeadingDetailStudent,
    AvatarStudent,
    InfoPersonStudent,
    HistoryUser,
    ModalEditUser,
    ModalUploadAvatar,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      showEditModal: false,
      showUploadAvatarModal: false,
    }
  },
}
</script>
<style></style>
