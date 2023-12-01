<template>
  <div class="p-10">
    <div class="">
      <AvatarStudent @upload-avatar-clicked="showUploadAvatarModal = true" />
      <InfoPersonUser @edit-clicked="showEditModal = true" />
      <div class="">
        <HistoryUser
          :userInfo="user.id"
          @edit-clicked="editExam"
          @delete-clicked="handleDeleteClicked"
        />
      </div>
      <ModalEditUser
        :show-modal="showEditModal"
        @close="showEditModal = false"
      />
    </div>
    <ModalUploadAvatar
      :show-modal="showUploadAvatarModal"
      @close="showUploadAvatarModal = false"
    />
    <ModalDelete
      :show-modal="showDeleteModal"
      :exam-id="examIdToDelete"
      @close="showDeleteModal = false"
    />
    <ModalEditExam
      :exam-item="detailExam"
      :show-modal="showEditModalExam"
      @close="showEditModalExam = false"
    />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AvatarStudent from '~/components/accounts/user/Detail_personal/Avatar'
import InfoPersonUser from '~/components/accounts/user/Detail_personal/InfoPersonal'
import HistoryUser from '~/components/accounts/user/Detail_personal/HistoryUser'
import ModalEditUser from '~/components/accounts/user/ModalEditUser.vue'
import ModalUploadAvatar from '~/components/accounts/user/ModalUploadAvatar.vue'
import ModalDelete from '~/components/common/ModalDelete'
import ModalEditExam from '~/components/common/ModalEdit/index.vue'

export default {
  name: 'DetailUser',
  components: {
    AvatarStudent,
    InfoPersonUser,
    HistoryUser,
    ModalEditUser,
    ModalUploadAvatar,
    ModalDelete,
    ModalEditExam,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      detailExam: null,
      examIdToDelete: null,
      showUploadAvatarModal: false,
      showDeleteModal: false,
      showEditModal: false,
      showEditModalExam: false,
    }
  },
  computed: {
    ...mapState('users', ['user']),
  },
  mounted() {
    this.getInfoUser()
    localStorage.removeItem('questionData')
  },
  methods: {
    ...mapActions('users', ['getInfoUser']),
    handleDeleteClicked(examId) {
      this.examIdToDelete = examId
      this.showDeleteModal = true
    },
    editExam(item) {
      this.detailExam = item
      this.showEditModalExam = true
      console.log(123)
    },
  },
}
</script>
<style></style>
