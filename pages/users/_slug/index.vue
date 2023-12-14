<template>
  <div class="p-10">
    <div class="">
      <AvatarStudent @upload-avatar-clicked="editAvatarUser" />
      <InfoPersonUser @edit-user-clicked="editUser" />
      <div class="">
        <HistoryUser
          :userInfo="user.id"
          @edit-clicked="editExam"
          @edit-clicked-exercise="editExercise"
          @delete-clicked="handleDeleteClicked"
          @delete-exercise-clicked="handleDeleteExerciseClicked"
        />
      </div>
      <ModalEditUser
        :show-modal="showEditModal"
        :detail-user="detailUser"
        @close="showEditModal = false"
      />
    </div>
    <ModalUploadAvatar
      :show-modal="showUploadAvatarModal"
      :detail-user="detailUser"
      @close="showUploadAvatarModal = false"
    />
    <ModalDelete
      :show-modal="showDeleteModal"
      :exam-id="examIdToDelete"
      :exercise-id="exerciseIdToDelete"
      @close="showDeleteModal = false"
    />
    <ModalEditExam
      :exam-item="detailExam"
      :show-modal="showEditModalExam"
      @close="showEditModalExam = false"
    />
    <ModalEditExercise
      :exercise-item="detailExercise"
      :show-modal="showEditModalExercise"
      @close="showEditModalExercise = false"
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
import ModalEditExercise from '~/components/ExerciseByTeacher/ModalEdit/index.vue'

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
    ModalEditExercise,
  },
  layout: 'defaultAdmin',
  data() {
    return {
      detailUser: null,
      detailExam: null,
      detailExercise: null,
      examIdToDelete: null,
      exerciseIdToDelete: null,
      showUploadAvatarModal: false,
      showDeleteModal: false,
      showEditModal: false,
      showEditModalExam: false,
      showEditModalExercise: false,
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
    handleDeleteExerciseClicked(exerciseId) {
      this.exerciseIdToDelete = exerciseId
      this.showDeleteModal = true
    },
    editUser(item) {
      this.detailUser = item
      this.showEditModal = true
      console.log(this.detailUser)
    },
    editAvatarUser(item) {
      this.detailUser = item
      this.showUploadAvatarModal = true
      console.log(this.detailUser)
    },
    editExam(item) {
      this.detailExam = item
      this.showEditModalExam = true
    },
    editExercise(item) {
      this.detailExercise = item
      this.showEditModalExercise = true
    },
  },
}
</script>
<style></style>
