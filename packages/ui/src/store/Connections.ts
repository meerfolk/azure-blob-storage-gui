import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Connections extends VuexModule {
    public errorMessage: string | null = null;

    @Mutation
    public setErrorMessage(value: string): void {
        this.errorMessage = value;
    }
}